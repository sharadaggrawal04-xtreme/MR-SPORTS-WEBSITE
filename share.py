import subprocess
import threading
import http.server
import socketserver
import re
import sys
import time
import os

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    def log_message(self, format, *args):
        pass  # Suppress standard logging for clean output

def run_server():
    socketserver.TCPServer.allow_reuse_address = True
    try:
        with socketserver.TCPServer(("", PORT), QuietHandler) as httpd:
            httpd.serve_forever()
    except Exception as e:
        print(f"Local server notice: {e}")

# Start local web server in daemon thread
server_thread = threading.Thread(target=run_server, daemon=True)
server_thread.start()
print(f"Local server running on http://localhost:{PORT}")
print("Connecting tunnel to create temporary public link...")
sys.stdout.flush()

ansi_regex = re.compile(r'\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])')

def find_url(text):
    clean = ansi_regex.sub('', text)
    matches = re.findall(r'https?://[a-zA-Z0-9\-\._~:/?#\[\]@!$&\'()*+,;=]+', clean)
    for m in matches:
        if any(host in m for host in ['pinggy.link', 'lhr.life', 'loca.lt', 'trycloudflare.com']):
            return m.strip('.')
    return None

url_found = None
active_proc = None

# Attempt 1: Pinggy over SSH (port 443)
try:
    cmd = ["ssh", "-o", "StrictHostKeyChecking=no", "-p", "443", f"-R0:localhost:{PORT}", "a.pinggy.io"]
    proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, bufsize=1)
    active_proc = proc
    start_time = time.time()
    while time.time() - start_time < 8:
        line = proc.stdout.readline()
        if not line and proc.poll() is not None:
            break
        u = find_url(line)
        if u:
            url_found = u
            break
except Exception as e:
    pass

# Attempt 2: localhost.run over SSH (port 80 or 22)
if not url_found:
    if active_proc:
        try:
            active_proc.kill()
        except Exception:
            pass
    try:
        print("Connecting via secondary tunnel service...")
        sys.stdout.flush()
        cmd = ["ssh", "-o", "StrictHostKeyChecking=no", "-R", f"80:localhost:{PORT}", "nokey@localhost.run"]
        proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, bufsize=1)
        active_proc = proc
        start_time = time.time()
        while time.time() - start_time < 8:
            line = proc.stdout.readline()
            if not line and proc.poll() is not None:
                break
            u = find_url(line)
            if u:
                url_found = u
                break
    except Exception as e:
        pass

# Attempt 3: Localtunnel via npx
if not url_found:
    if active_proc:
        try:
            active_proc.kill()
        except Exception:
            pass
    try:
        print("Connecting via localtunnel...")
        sys.stdout.flush()
        cmd = ["npx.cmd", "-y", "localtunnel", "--port", str(PORT)]
        proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, bufsize=1)
        active_proc = proc
        start_time = time.time()
        while time.time() - start_time < 12:
            line = proc.stdout.readline()
            if not line and proc.poll() is not None:
                break
            u = find_url(line)
            if u:
                url_found = u
                break
    except Exception as e:
        pass

if url_found:
    print("")
    print("================================================================")
    print("TEMPORARY PUBLIC LINK READY:")
    print(f"URL: {url_found}")
    print("================================================================")
    print("Anyone can open this link on their phone or computer!")
    sys.stdout.flush()
    # Save the link to a text file for easy access
    link_file = os.path.join(DIRECTORY, "current-live-link.txt")
    with open(link_file, "w") as f:
        f.write(url_found)
    try:
        while active_proc and active_proc.poll() is None:
            time.sleep(1)
    except KeyboardInterrupt:
        pass
else:
    print("Unable to automatically establish tunnel. Please check internet connection.")
    sys.stdout.flush()
