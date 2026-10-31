// MR SPORTS - DARK ARCHITECTURAL EDITORIAL CATALOG
// Dynamic product filtering, pricing, search, wishlist & WhatsApp inquiry handling

(function() {
  'use strict';

  // Safe localStorage helper for cross-browser compatibility (private mode / webviews / file://)
  function getSafeSavedProducts() {
    try {
      const stored = localStorage.getItem('mr_saved_products');
      return new Set(stored ? JSON.parse(stored) : []);
    } catch (e) {
      return new Set();
    }
  }

  function setSafeSavedProducts(setObj) {
    try {
      localStorage.setItem('mr_saved_products', JSON.stringify([...setObj]));
    } catch (e) {
      // Graceful fallback if storage is restricted
    }
  }

  // State
  const state = {
    selectedCategory: 'english-willow-bats',
    searchQuery: '',
    priceFilter: 'all',
    sortBy: 'featured',
    currency: 'INR',
    usdExchangeRate: 0.012,
    savedProductIds: getSafeSavedProducts(),
    showingSavedOnly: false,
    selectedOvers: {}
  };

  // DOM Elements
  const productGrid = document.getElementById('productGrid');
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');
  const priceFilterSelect = document.getElementById('priceFilterSelect');
  const currencySelect = document.getElementById('currencySelect');
  const categoryFilterBar = document.getElementById('categoryFilterBar');
  const toastNotice = document.getElementById('toastNotice');

  // Modals & Forms
  const inquiryModal = document.getElementById('inquiryModal');
  const closeInquiryBtn = document.getElementById('closeInquiryBtn');
  const modalInquiryForm = document.getElementById('modalInquiryForm');
  const modalInquiryProduct = document.getElementById('modalInquiryProduct');
  const directInquiryForm = document.getElementById('directInquiryForm');
  const directWhatsAppBtn = document.getElementById('directWhatsAppBtn');

  // Currency Formatter
  function formatPrice(inrAmount) {
    if (state.currency === 'USD') {
      const usd = Math.round(inrAmount * state.usdExchangeRate);
      return `$${usd.toLocaleString('en-US')}`;
    }
    return `₹${inrAmount.toLocaleString('en-IN')}`;
  }

  // Update Category Counters
  function updateCategoryCounters() {
    const counts = { all: cricketProducts.length };
    cricketProducts.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });

    Object.keys(counts).forEach(cat => {
      const el = document.getElementById(`count-${cat}`);
      if (el) el.textContent = counts[cat];
    });
  }

  // Filter & Sort Products
  function getFilteredProducts() {
    let list = [...cricketProducts];

    // Saved items filter
    if (state.showingSavedOnly) {
      list = list.filter(p => state.savedProductIds.has(p.id));
    }

    // Category filter
    if (state.selectedCategory !== 'all') {
      list = list.filter(p => p.category === state.selectedCategory);
    }

    // Search query
    if (state.searchQuery.trim() !== '') {
      const q = state.searchQuery.toLowerCase();
      list = list.filter(p => {
        const inName = p.name.toLowerCase().includes(q);
        const inCategory = p.categoryName.toLowerCase().includes(q);
        const inDesc = p.shortDesc.toLowerCase().includes(q);
        const inSpecs = p.specifications && p.specifications.some(s => s.toLowerCase().includes(q));
        return inName || inCategory || inDesc || inSpecs;
      });
    }

    // Price bracket filter
    if (state.priceFilter === 'under-500' || state.priceFilter === 'under-1500') {
      list = list.filter(p => p.price < (state.priceFilter === 'under-500' ? 500 : 1500));
    } else if (state.priceFilter === '500-1000') {
      list = list.filter(p => p.price >= 500 && p.price <= 1000);
    } else if (state.priceFilter === '1000-2000' || state.priceFilter === '1500-5000') {
      list = list.filter(p => p.price >= 1000 && p.price <= (state.priceFilter === '1000-2000' ? 2000 : 5000));
    } else if (state.priceFilter === 'above-2000' || state.priceFilter === 'above-15000' || state.priceFilter === '5000-15000') {
      list = list.filter(p => p.price >= (state.priceFilter === 'above-2000' ? 2000 : 5000));
    }

    // Sorting
    if (state.sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (state.sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (state.sortBy === 'rating-desc') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }

  // Carousel State Tracking
  const carouselIndices = {};

  function navigateCarousel(prodId, dir) {
    const p = cricketProducts.find(item => item.id === prodId);
    if (!p || !p.images || p.images.length <= 1) return;

    let curr = carouselIndices[prodId] || 0;
    if (dir === 'next') {
      curr = (curr + 1) % p.images.length;
    } else {
      curr = (curr - 1 + p.images.length) % p.images.length;
    }
    goToCarouselSlide(prodId, curr);
  }

  function goToCarouselSlide(prodId, idx) {
    const p = cricketProducts.find(item => item.id === prodId);
    if (!p || !p.images) return;

    carouselIndices[prodId] = idx;
    const track = document.querySelector(`[data-track-id="${prodId}"]`);
    if (track) {
      track.style.transform = `translateX(-${idx * 100}%)`;
    }

    // Update Counter Pill
    const counter = document.getElementById(`counter-${prodId}`);
    if (counter) {
      const idxSpan = counter.querySelector('.slide-idx');
      if (idxSpan) idxSpan.textContent = idx + 1;
    }

    // Update Dots
    const dotsContainer = document.querySelector(`[data-dots-id="${prodId}"]`);
    if (dotsContainer) {
      dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === idx);
      });
    }

    // Update Visible Thumbnails Strip
    const thumbs = document.querySelectorAll(`[data-thumbs-id="${prodId}"] .card-thumb-item`);
    thumbs.forEach((th, i) => {
      th.classList.toggle('active', i === idx);
    });
  }

  // Render Product Cards
  function renderProducts() {
    const filtered = getFilteredProducts();

    if (filtered.length === 0) {
      productGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; border: 1px dashed var(--border-hairline); background-color: var(--bg-card);">
          <h3 style="font-family: var(--font-display); font-size: 1.35rem; color: var(--red-primary); margin-bottom: 0.5rem; text-transform: uppercase;">NO EQUIPMENT FOUND</h3>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem;">No products match your selected category, search criteria, or price filter.</p>
          <button class="contact-submit-btn" id="resetFiltersBtn">RESET FILTERS</button>
        </div>
      `;
      document.getElementById('resetFiltersBtn')?.addEventListener('click', resetAllFilters);
      return;
    }

    productGrid.innerHTML = filtered.map(p => {
      const isSaved = state.savedProductIds.has(p.id);

      // Handle variant pricing if product has variants (like balls: 20, 30, 50 overs)
      let activePrice = p.price;
      let activeOriginalPrice = p.originalPrice;
      let activeBadge = p.badge;
      let activeDurability = p.availability || 'In Stock';
      let activeVariantLabel = '';

      if (p.variants && p.variants.length > 0) {
        const selectedKey = (state.selectedOvers && state.selectedOvers[p.id]) || p.variants[0].oversKey;
        const currentVar = p.variants.find(v => v.oversKey === selectedKey) || p.variants[0];
        activePrice = currentVar.price;
        activeOriginalPrice = currentVar.originalPrice;
        activeBadge = currentVar.badge;
        activeDurability = currentVar.durabilityText || `${currentVar.overs} Certified`;
        activeVariantLabel = ` (${currentVar.label})`;
      }

      const discountPercent = activeOriginalPrice ? Math.round(((activeOriginalPrice - activePrice) / activeOriginalPrice) * 100) : 0;
      
      const whatsappText = encodeURIComponent(
        `Hello MR Sports! I am inquiring about the "${p.name}${activeVariantLabel}" (Catalog Price: ${formatPrice(activePrice)}). Could you please share specs, custom weights, and order details?`
      );

      const hasMultiImages = p.images && p.images.length > 1;
      const isBat = p.category === 'english-willow-bats' || p.category === 'kashmiri-willow-bats';

      return `
        <article class="dark-card" data-product-id="${p.id}" data-category="${p.category}">
          <div class="card-media-box ${isBat ? 'bat-frame-box' : ''}">
            ${activeBadge ? `<span class="card-badge-pill">${activeBadge}</span>` : ''}
            
            <button class="card-save-btn" data-save-id="${p.id}" title="${isSaved ? 'Remove from Saved' : 'Save Item'}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="${isSaved ? 'var(--red-primary)' : 'none'}" stroke="var(--red-primary)" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>

            ${hasMultiImages ? `
              <div class="card-carousel-track" data-track-id="${p.id}">
                ${p.images.map((imgSrc, idx) => `
                  <div class="card-carousel-slide ${isBat ? 'bat-slide' : ''}">
                    <img 
                      src="${imgSrc}" 
                      alt="${p.name} - Angle ${idx + 1}" 
                      class="card-product-img ${isBat ? 'bat-frame-img' : ''}" 
                      loading="lazy"
                      onerror="this.onerror=null; this.src='${fallbackCricketImage}';"
                    >
                  </div>
                `).join('')}
              </div>

              <button type="button" class="carousel-nav-btn prev-btn" data-carousel-nav="prev" data-target="${p.id}" title="Previous photo" aria-label="Previous photo">‹</button>
              <button type="button" class="carousel-nav-btn next-btn" data-carousel-nav="next" data-target="${p.id}" title="Next photo" aria-label="Next photo">›</button>

              <div class="carousel-counter-badge" id="counter-${p.id}">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10l-2.5-3.01L11 14.5l-2-2.5-3 4h12l-2-3z"/></svg>
                <span class="slide-idx">1</span>/${p.images.length}
              </div>

              <div class="carousel-dots-indicator" data-dots-id="${p.id}">
                ${p.images.map((_, idx) => `<span class="carousel-dot ${idx === 0 ? 'active' : ''}" data-dot-idx="${idx}" data-target="${p.id}"></span>`).join('')}
              </div>
            ` : `
              <img 
                src="${p.image}" 
                alt="${p.name}" 
                class="card-product-img ${isBat ? 'bat-frame-img' : ''}" 
                loading="lazy"
                onerror="this.onerror=null; this.src='${fallbackCricketImage}';"
              >
            `}
          </div>

          ${hasMultiImages ? `
            <div class="card-thumbs-strip ${p.images.length <= 3 ? 'cols-2' : ''}" data-thumbs-id="${p.id}">
              ${p.images.map((imgSrc, idx) => `
                <button type="button" class="card-thumb-item ${idx === 0 ? 'active' : ''}" data-target="${p.id}" data-thumb-idx="${idx}" title="Photo ${idx + 1}">
                  <img src="${imgSrc}" alt="thumb ${idx + 1}">
                </button>
              `).join('')}
            </div>
          ` : ''}

          <div class="card-details-box">
            <span class="card-category-tag">${p.categoryName}</span>
            <h3 class="card-product-title" title="${p.name}">${p.name}</h3>
            
            <div class="card-rating-line">
              <span>★★★★★</span>
              <span style="color: var(--text-muted); font-size: 0.7rem; font-family: sans-serif;">${p.rating} (${p.reviewsCount})</span>
            </div>

            <p class="card-snippet-text">${p.shortDesc}</p>

            ${p.variants && p.variants.length > 0 ? `
              <div class="card-overs-selector">
                <span class="overs-selector-title">SELECT MATCH SPECIFICATION (OVERS):</span>
                <div class="overs-selector-btns">
                  ${p.variants.map(v => {
                    const isSelected = ((state.selectedOvers && state.selectedOvers[p.id]) || p.variants[0].oversKey) === v.oversKey;
                    return `
                      <button 
                        type="button" 
                        class="overs-btn ${isSelected ? 'active' : ''}" 
                        data-overs-prod="${p.id}" 
                        data-overs-key="${v.oversKey}"
                        title="${v.label} - ${formatPrice(v.price)}"
                      >
                        <span class="overs-btn-title">${v.overs}</span>
                        <span class="overs-btn-price">${formatPrice(v.price)}</span>
                      </button>
                    `;
                  }).join('')}
                </div>
              </div>
            ` : ''}

            <div class="card-pricing-strip">
              <div class="price-numbers-row">
                <span class="price-main">${formatPrice(activePrice)}</span>
                ${activeOriginalPrice ? `<span class="price-mrp">${formatPrice(activeOriginalPrice)}</span>` : ''}
                ${discountPercent > 0 ? `<span class="price-save-tag">SAVE ${discountPercent}%</span>` : ''}
              </div>
              <div class="stock-indicator">
                <span class="stock-dot"></span>
                <span>${activeDurability} • DIRECT ATELIER RATE</span>
              </div>
            </div>

            <div class="card-actions-row">
              <button class="card-inquire-btn" data-inquire-id="${p.id}">
                INQUIRE FOR PRICE
              </button>
              <a 
                href="https://wa.me/919897206955?text=${whatsappText}" 
                target="_blank" 
                rel="noopener" 
                class="card-whatsapp-btn" 
                title="Inquire via WhatsApp"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.941-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.181-.076.355.101.173.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.679.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.072.043.419-.101.824z"/></svg>
              </a>
            </div>
          </div>
        </article>
      `;
    }).join('');

    bindCardEvents();
  }

  // Bind Dynamic Card Events
  function bindCardEvents() {
    // Inquire buttons
    document.querySelectorAll('.card-inquire-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-inquire-id');
        openInquiryModalForProduct(id);
      });
    });

    // Wishlist buttons
    document.querySelectorAll('.card-save-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-save-id');
        toggleSaveProduct(id);
      });
    });

    // Carousel Navigation Arrows
    document.querySelectorAll('.carousel-nav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetId = btn.getAttribute('data-target');
        const dir = btn.getAttribute('data-carousel-nav');
        navigateCarousel(targetId, dir);
      });
    });

    // Carousel Dots
    document.querySelectorAll('.carousel-dot').forEach(dot => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetId = dot.getAttribute('data-target');
        const idx = parseInt(dot.getAttribute('data-dot-idx'), 10);
        goToCarouselSlide(targetId, idx);
      });
    });

    // Mobile / Touch Swipe on multi-image cards
    document.querySelectorAll('.card-media-box').forEach(box => {
      let startX = 0;
      box.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
      }, { passive: true });
      box.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        const card = box.closest('.dark-card');
        const targetId = card?.getAttribute('data-product-id');
        if (targetId && Math.abs(diff) > 40) {
          if (diff > 0) {
            navigateCarousel(targetId, 'next');
          } else {
            navigateCarousel(targetId, 'prev');
          }
        }
      }, { passive: true });
    });

    // Thumbnail Clicks and Hovers
    document.querySelectorAll('.card-thumb-item').forEach(th => {
      th.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetId = th.getAttribute('data-target');
        const idx = parseInt(th.getAttribute('data-thumb-idx'), 10);
        goToCarouselSlide(targetId, idx);
      });
      th.addEventListener('mouseenter', (e) => {
        const targetId = th.getAttribute('data-target');
        const idx = parseInt(th.getAttribute('data-thumb-idx'), 10);
        goToCarouselSlide(targetId, idx);
      });
    });

    // Overs Variant Selector Buttons (20 / 30 / 50 Overs)
    document.querySelectorAll('.overs-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const prodId = btn.getAttribute('data-overs-prod');
        const key = btn.getAttribute('data-overs-key');
        if (!state.selectedOvers) state.selectedOvers = {};
        state.selectedOvers[prodId] = key;
        renderProducts();
      });
    });

    // Product title click specifically opens inquiry (without hijacking touch scroll on the card)
    document.querySelectorAll('.card-product-title').forEach(title => {
      title.style.cursor = 'pointer';
      title.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = title.closest('.dark-card');
        const id = card?.getAttribute('data-product-id');
        openInquiryModalForProduct(id);
      });
    });

    if (window.init3DCardTilt) {
      window.init3DCardTilt();
    }
  }

  // Inquiry Modal Logic
  function openInquiryModalForProduct(productId) {
    const p = productId ? cricketProducts.find(item => item.id === productId) : null;
    if (p) {
      let displayName = p.name;
      let displayPrice = p.price;
      if (p.variants && p.variants.length > 0) {
        const selectedKey = (state.selectedOvers && state.selectedOvers[p.id]) || p.variants[0].oversKey;
        const currentVar = p.variants.find(v => v.oversKey === selectedKey) || p.variants[0];
        displayName = `${p.name} (${currentVar.label})`;
        displayPrice = currentVar.price;
      }
      modalInquiryProduct.value = `${displayName} — [Catalog Price: ${formatPrice(displayPrice)}]`;
    } else {
      modalInquiryProduct.value = 'General Equipment Inquiry / Bulk Order';
    }

    inquiryModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeInquiryModal() {
    inquiryModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Wishlist Save / Unsave
  function toggleSaveProduct(id) {
    if (state.savedProductIds.has(id)) {
      state.savedProductIds.delete(id);
      showToast('Item removed from saved list');
    } else {
      state.savedProductIds.add(id);
      showToast('Item saved to your list');
    }
    setSafeSavedProducts(state.savedProductIds);
    renderProducts();
  }

  // Toast Notice Helper
  function showToast(message) {
    toastNotice.textContent = message;
    toastNotice.classList.add('show');
    setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 2800);
  }

  // Reset Filters
  function resetAllFilters() {
    state.selectedCategory = 'english-willow-bats';
    state.searchQuery = '';
    state.priceFilter = 'all';
    state.sortBy = 'featured';
    state.showingSavedOnly = false;

    if (searchInput) searchInput.value = '';
    if (priceFilterSelect) priceFilterSelect.value = 'all';
    if (sortSelect) sortSelect.value = 'featured';

    document.querySelectorAll('.category-chip-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-category') === 'english-willow-bats');
    });

    renderProducts();
  }

  // Initialize Event Listeners
  function initEvents() {
    // Category Chips Click
    categoryFilterBar?.addEventListener('click', (e) => {
      const btn = e.target.closest('.category-chip-btn');
      if (!btn) return;

      state.showingSavedOnly = false;
      const cat = btn.getAttribute('data-category');
      state.selectedCategory = cat;

      document.querySelectorAll('.category-chip-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      renderProducts();
    });

    // Search Input
    searchInput?.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderProducts();
    });

    // Sort Select
    sortSelect?.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderProducts();
    });

    // Price Filter Select
    priceFilterSelect?.addEventListener('change', (e) => {
      state.priceFilter = e.target.value;
      renderProducts();
    });

    // Currency Switcher
    currencySelect?.addEventListener('change', (e) => {
      state.currency = e.target.value;
      renderProducts();
      showToast(`Currency set to ${state.currency === 'USD' ? 'USD ($)' : 'INR (₹)'}`);
    });

    // Header Inquiry Trigger
    document.getElementById('headerInquiryBtn')?.addEventListener('click', () => openInquiryModalForProduct(null));

    // Close Modal
    closeInquiryBtn?.addEventListener('click', closeInquiryModal);
    inquiryModal?.addEventListener('click', (e) => {
      if (e.target === inquiryModal) closeInquiryModal();
    });

    // Escape Key to Close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeInquiryModal();
    });

    // Modal Inquiry Form Submit
    modalInquiryForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('modalInquiryName').value;
      const phone = document.getElementById('modalInquiryPhone').value;
      const email = document.getElementById('modalInquiryEmail').value;
      const product = modalInquiryProduct.value;
      const notes = document.getElementById('modalInquiryNotes').value;

      closeInquiryModal();
      showToast('Connecting directly via WhatsApp (+91 9897206955)...');
      modalInquiryForm.reset();

      const msg = encodeURIComponent(
        `Hi MR Sports! I am inquiring about:\n${product}\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nNotes: ${notes}`
      );
      setTimeout(() => {
        window.open(`https://wa.me/919897206955?text=${msg}`, '_blank') || (window.location.href = `https://wa.me/919897206955?text=${msg}`);
      }, 300);
    });

    // Dynamic WhatsApp Link Updater for Contact Form
    function updateWhatsAppLinks() {
      const name = document.getElementById('contactName')?.value?.trim();
      const phone = document.getElementById('contactPhone')?.value?.trim();
      const category = document.getElementById('contactCategorySelect')?.value?.trim();
      const message = document.getElementById('contactMessage')?.value?.trim();

      let text = 'Hello MR Sports! I would like to inquire about your cricket equipment and catalog pricing.';
      if (name || category || message || phone) {
        const parts = ['Hello MR Sports!'];
        if (name) parts.push(`Name: ${name}`);
        if (phone) parts.push(`Phone: ${phone}`);
        if (category) parts.push(`Interested in: ${category}`);
        if (message) parts.push(`Requirements: ${message}`);
        text = parts.join('\n');
      }

      const encoded = encodeURIComponent(text);
      const link1 = document.getElementById('directWhatsAppBtn');
      const link2 = document.getElementById('directWhatsAppBtn2');
      if (link1) link1.href = `https://wa.me/919897206955?text=${encoded}`;
      if (link2) link2.href = `https://wa.me/919762632228?text=${encoded}`;
    }

    ['contactName', 'contactPhone', 'contactCategorySelect', 'contactMessage'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', updateWhatsAppLinks);
    });

    directWhatsAppBtn?.addEventListener('click', updateWhatsAppLinks);
    document.getElementById('directWhatsAppBtn2')?.addEventListener('click', updateWhatsAppLinks);

    // Bottom Direct Inquiry Form
    directInquiryForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName').value || 'Customer';
      const phone = document.getElementById('contactPhone').value || '';
      const category = document.getElementById('contactCategorySelect').value || '';
      const message = document.getElementById('contactMessage').value || '';

      const msg = encodeURIComponent(
        `Hello MR Sports!\nName: ${name}\nPhone: ${phone}\nCategory: ${category}\nQuery: ${message}`
      );
      showToast('Redirecting directly to WhatsApp on (+91 9897206955)...');
      setTimeout(() => {
        window.open(`https://wa.me/919897206955?text=${msg}`, '_blank') || (window.location.href = `https://wa.me/919897206955?text=${msg}`);
      }, 300);
      directInquiryForm.reset();
    });

    // Architectural Arrow Buttons Smooth Scroll
    document.querySelectorAll('.arrow-box').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (btn.id === 'directWhatsAppBtn') return;
        const sections = ['#about', '#services', '#catalog', '#contact'];
        const currentScroll = window.scrollY;
        // Scroll slightly forward or backward
        if (btn.textContent.includes('▶')) {
          window.scrollBy({ top: 500, behavior: 'smooth' });
        } else {
          window.scrollBy({ top: -500, behavior: 'smooth' });
        }
      });
    });
  }

  // Initialize
  function init() {
    updateCategoryCounters();
    initEvents();
    renderProducts();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
