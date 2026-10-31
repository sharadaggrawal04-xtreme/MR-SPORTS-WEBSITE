// Cricket Accessories & Goods Catalog Data
// Pure Product Listing & Pricing (Direct Factory Rates from Meerut Workshop)

const cricketProducts = [
  // ==========================================
  // ENGLISH WILLOW BATS (3 Grades)
  // Grade 1: Top-Notch Reserve (₹2,850)
  // Grade 2: Tournament Match (₹2,650)
  // Grade 3: Club Standard (₹2,450)
  // ==========================================
  {
    id: "ew-bat-01",
    name: "MR Grade 1 English Willow Cricket Bat",
    category: "english-willow-bats",
    categoryName: "English Willow Bats",
    price: 2850,
    originalPrice: 3800,
    badge: "Grade 1 • Top Notch",
    rating: 5.0,
    reviewsCount: 68,
    image: "images/bats/english-willow/grade-1/bat-1.jpeg",
    images: [
      "images/bats/english-willow/grade-1/bat-1.jpeg",
      "images/bats/english-willow/grade-1/bat-2.jpeg"
    ],
    shortDesc: "Top-notch unbleached Grade 1 English Willow cleft hand-crafted for elite match players. Features straight dense grains, thick 38-40mm power edges, and feather-light balanced pickup.",
    availability: "In Stock • Grade 1 Match Reserve",
    specifications: [
      "Direct Factory Price: ₹2,850",
      "Grade: Hand-Selected Grade 1 English Willow (Top Notch Quality)",
      "Grains: Straight, clean, dense grain structure with blemish-free face",
      "Edge Profile: 38 - 40 mm thick contoured power edges",
      "Sweet Spot: Mid-to-low sweet spot engineered for explosive boundary hitting",
      "Handle: Premium Sarawak multi-piece cane handle with rubber vibration dampeners",
      "Toe: Pre-fitted curved rubber toe guard and anti-scuff face sheet"
    ]
  },
  {
    id: "ew-bat-02",
    name: "MR Grade 2 English Willow Cricket Bat",
    category: "english-willow-bats",
    categoryName: "English Willow Bats",
    price: 2650,
    originalPrice: 3500,
    badge: "Grade 2 • Match Edition",
    rating: 4.8,
    reviewsCount: 54,
    image: "images/bats/english-willow/grade-2/bat-1.jpeg",
    images: [
      "images/bats/english-willow/grade-2/bat-1.jpeg",
      "images/bats/english-willow/grade-2/bat-2.jpeg"
    ],
    shortDesc: "High-performance Grade 2 English Willow cleft with superior wood density and rebound. Straight grains with slight natural wood character for tournament and league cricketers.",
    availability: "In Stock • Grade 2 Tournament Match",
    specifications: [
      "Direct Factory Price: ₹2,650",
      "Grade: Handcrafted Grade 2 Air-Dried English Willow (Lower than Grade 1)",
      "Grains: 6 - 8 visible straight grains with natural cleft character",
      "Edge Profile: 36 - 38 mm power edges with pronounced spine",
      "Sweet Spot: Full mid profile offering balanced front and back foot play",
      "Handle: Layered cane handle for effective shock absorption and bat control",
      "Toe: Durable fitted rubber toe guard"
    ]
  },
  {
    id: "ew-bat-03",
    name: "MR Grade 3 English Willow Cricket Bat",
    category: "english-willow-bats",
    categoryName: "English Willow Bats",
    price: 2450,
    originalPrice: 3200,
    badge: "Grade 3 • Club Standard",
    rating: 4.6,
    reviewsCount: 41,
    image: "images/bats/english-willow/grade-3/bat-1.jpeg",
    images: [
      "images/bats/english-willow/grade-3/bat-1.jpeg",
      "images/bats/english-willow/grade-3/bat-2.jpeg"
    ],
    shortDesc: "Authentic Grade 3 English Willow bat offering true English willow punch at accessible direct factory pricing. Rugged wood fiber profile engineered for academy nets and club matches.",
    availability: "In Stock • Grade 3 Club Match",
    specifications: [
      "Direct Factory Price: ₹2,450",
      "Grade: Grade 3 English Willow cleft (Club Standard)",
      "Grains: 4 - 6 visible grain markings with high fiber density",
      "Edge Profile: 35 - 37 mm robust power edges",
      "Sweet Spot: Mid profile with generous hitting zone",
      "Handle: Flexible cane handle with textured spiral grip",
      "Finish: Natural wax buff finish with transparent cross-weave face sheet"
    ]
  },

  // ==========================================
  // KASHMIR WILLOW BATS (3 Grades)
  // Grade 1: Top-Notch Tournament (₹1,850)
  // Grade 2: Club Match (₹1,650)
  // Grade 3: Academy Training (₹1,450)
  // ==========================================
  {
    id: "kw-bat-01",
    name: "MR Grade 1 Kashmir Willow Cricket Bat",
    category: "kashmiri-willow-bats",
    categoryName: "Kashmir Willow Bats",
    price: 1850,
    originalPrice: 2500,
    badge: "Grade 1 • Tournament",
    rating: 4.8,
    reviewsCount: 88,
    image: "images/bats/kashmir-willow/grade-1/bat-1.jpeg",
    images: [
      "images/bats/kashmir-willow/grade-1/bat-1.jpeg"
    ],
    shortDesc: "Top-notch Grade 1 seasoned Kashmir willow hand-pressed for leather ball tournament play. Massive profile with 38-40mm edges and light, balanced pickup.",
    availability: "In Stock • Grade 1 Match Grade",
    specifications: [
      "Direct Factory Price: ₹1,850",
      "Grade: Top-Notch Grade 1 Hand-Sorted Seasoned Kashmir Willow",
      "Compression: High-density roller compressed for maximum leather ball rebound",
      "Edge Profile: 38 - 40 mm power edges",
      "Profile: Full spine profile with extended power zone",
      "Handle: Full cane round handle for superior shock dampening",
      "Suitable For: Leather match ball & heavy tennis ball tournaments"
    ]
  },
  {
    id: "kw-bat-02",
    name: "MR Grade 2 Kashmir Willow Cricket Bat",
    category: "kashmiri-willow-bats",
    categoryName: "Kashmir Willow Bats",
    price: 1650,
    originalPrice: 2200,
    badge: "Grade 2 • Best Value",
    rating: 4.7,
    reviewsCount: 72,
    image: "images/bats/kashmir-willow/grade-2/bat-1.jpeg",
    images: [
      "images/bats/kashmir-willow/grade-2/bat-1.jpeg"
    ],
    shortDesc: "Grade 2 seasoned Kashmir willow bat engineered for club matches and heavy tennis / leather ball play. Balanced blade distribution with quick wrist acceleration.",
    availability: "In Stock • Grade 2 Club Match",
    specifications: [
      "Direct Factory Price: ₹1,650",
      "Grade: Selected Grade 2 Seasoned Kashmir Willow (Lower than Grade 1)",
      "Edge Profile: 36 - 38 mm contoured edges",
      "Sweet Spot: Mid-to-high sweet spot for all-around stroke versatility",
      "Handle: Durable cane handle with chevron embossed rubber grip",
      "Weight: 1180 - 1220 grams (Balanced pickup)",
      "Usage: Leather ball matches and academy practice"
    ]
  },
  {
    id: "kw-bat-03",
    name: "MR Grade 3 Kashmir Willow Cricket Bat",
    category: "kashmiri-willow-bats",
    categoryName: "Kashmir Willow Bats",
    price: 1450,
    originalPrice: 1950,
    badge: "Grade 3 • Academy Training",
    rating: 4.5,
    reviewsCount: 63,
    image: "images/bats/kashmir-willow/grade-3/bat-1.jpeg",
    images: [
      "images/bats/kashmir-willow/grade-3/bat-1.jpeg"
    ],
    shortDesc: "Rugged Grade 3 Kashmir willow bat built for intense practice sessions, academy nets, and casual matches. Rugged durability with responsive feel.",
    availability: "In Stock • Grade 3 Practice",
    specifications: [
      "Direct Factory Price: ₹1,450",
      "Grade: Tough Grade 3 Kashmir Willow cleft (Academy Standard)",
      "Durability: Extra hardened face for longevity in academy nets",
      "Edge Profile: 34 - 36 mm durable profile",
      "Handle: Sturdy cane composite handle",
      "Grip: Non-slip spiral rubber grip",
      "Ideal For: Daily academy training, casual tournaments, club nets"
    ]
  },

  // ==========================================
  // GLOVES (Batting & Wicket Keeping)
  // ==========================================
  // BATTING GLOVES
  // Exact quotes & specifications from chats
  // ==========================================
  {
    id: "gloves-01",
    name: "MR Diamond Edition Batting Gloves",
    category: "batting-gloves",
    categoryName: "Batting Gloves",
    price: 1450,
    originalPrice: 1950,
    badge: "Diamond Edition • Top Tier",
    rating: 5.0,
    reviewsCount: 58,
    image: "images/gloves/glove-1.jpeg",
    shortDesc: "Multi-layered padding shields hands from fast bowls. High-quality leather palm keeps bat from slipping mid-swing, with segmented finger rolls for natural movement.",
    availability: "In Stock • Diamond Pro Tier",
    specifications: [
      "Direct Factory Price: ₹1,450",
      "Top Highlights: Multi-layered padding shields hands from fast bowls",
      "Top Highlights: Leather palm keeps bat from slipping mid-swing",
      "Top Highlights: Segmented finger rolls let you move naturally",
      "Premium Protection: Thick multi-layered padding on fingers and back of hand",
      "Striking Design: Bold white and gold colour scheme with MR branding",
      "Superior Grip: Palm constructed with high-quality leather material for firm control",
      "Secure Fit: Sturdy wrist strap and elasticated cuff for snug adjustable fit"
    ]
  },
  {
    id: "gloves-02",
    name: "MR Gold Edition Batting Gloves",
    category: "batting-gloves",
    categoryName: "Batting Gloves",
    price: 975,
    originalPrice: 1350,
    badge: "Gold Edition • 140+ km/h",
    rating: 4.9,
    reviewsCount: 44,
    image: "images/gloves/glove-2.jpeg",
    shortDesc: "Multi-layer foam absorbs hard ball impact safely. Air mesh panels keep hands cool during long innings, and Velcro strap locks wrist in place for stability.",
    availability: "In Stock • 140+ Pace Rated",
    specifications: [
      "Direct Factory Price: ₹975",
      "Top Highlights: Multi-layer foam absorbs hard ball impact safely",
      "Top Highlights: Air mesh panels keep hands cool during long innings",
      "Top Highlights: Velcro strap locks wrist in place for stability",
      "Finger Protection: Multi-layer foam padding for shock absorption against leather ball impact",
      "Pace Bowling Safety: Easy to use for 140+ km/h speed bowling full protected cricket batting gloves",
      "Enhanced Palm Grip: Superior bat control for powerful shots and confident stroke play",
      "Lightweight & Breathable: Air mesh panels reduce sweat during long innings",
      "Wrist Support: Secure Velcro strap for firm grip and stability"
    ]
  },
  {
    id: "gloves-03",
    name: "MR Cotton Practice Batting Gloves",
    category: "batting-gloves",
    categoryName: "Batting Gloves",
    price: 221,
    originalPrice: 320,
    badge: "Cotton Series • Best Value",
    rating: 4.7,
    reviewsCount: 63,
    image: "images/gloves/glove-3.jpeg",
    shortDesc: "Cotton palm absorbs sweat for better bat grip. Padded fingers protect hands without limiting movement, and lightweight design reduces hand fatigue during long innings.",
    availability: "In Stock • Practice & Training",
    specifications: [
      "Direct Factory Price: ₹221",
      "Top Highlights: Cotton palm absorbs sweat for better bat grip",
      "Top Highlights: Padded fingers protect hands without limiting movement",
      "Top Highlights: Lightweight design reduces hand fatigue during long innings",
      "Material: Durable PVC sheet outer material for enhanced durability and reliable protection",
      "Palm Grip: Comfortable soft cotton palm grip provides sweat absorption and bat control",
      "Protection: High-density protective finger padding for impact safety while maintaining flexibility",
      "Design: Lightweight and breathable design for long practice and academy sessions"
    ]
  },
  {
    id: "gloves-04",
    name: "MR Thunder Match Batting Gloves",
    category: "batting-gloves",
    categoryName: "Batting Gloves",
    price: 390,
    originalPrice: 550,
    badge: "Thunder Series • Pro Fit",
    rating: 4.8,
    reviewsCount: 71,
    image: "images/gloves/glove-4.jpeg",
    shortDesc: "Padded palm reduces hand fatigue during long matches. Mesh ventilation keeps hands cool and dry, with adjustable wrist strap customizing fit for your hand.",
    availability: "In Stock • Match & Training",
    specifications: [
      "Direct Factory Price: ₹390",
      "Top Highlights: Padded palm reduces hand fatigue during long matches",
      "Top Highlights: Mesh ventilation keeps hands cool and dry",
      "Top Highlights: Adjustable wrist strap customizes fit for your hand",
      "Premium Design: Professional cricket batting gloves featuring red, white, and black colour scheme",
      "Comfort Fit: Padded palm area with flexible material construction ensures superior grip and reduces fatigue",
      "Wrist Support: Adjustable elastic wrist band provides customised fit and additional stability",
      "Versatile Use: Ideal for various sports activities including batting, fielding, and general athletic training",
      "Construction: High-quality synthetic materials with precision reinforced stitching"
    ]
  },
  {
    id: "gloves-05",
    name: "MR Comfort Wicket Keeping Gloves",
    category: "keeping-gloves",
    categoryName: "Keeping Gloves",
    price: 1050,
    originalPrice: 1450,
    badge: "Comfort Keeping • Adult",
    rating: 4.8,
    reviewsCount: 52,
    image: "images/gloves/glove-5.jpeg",
    shortDesc: "Rubber grip palm keeps ball secure during catches. Padded fingers absorb impact from fast deliveries, with wide wrist band staying locked during intense play.",
    availability: "In Stock • Adult Keeping Spec",
    specifications: [
      "Direct Factory Price: ₹1,050",
      "Top Highlights: Rubber grip palm keeps ball secure during catches",
      "Top Highlights: Padded fingers absorb impact from fast deliveries",
      "Top Highlights: Wide wrist band stays locked during intense play",
      "Cup Design: Made from high quality material with a natural cup and palm design",
      "Materials: High quality synthetic-leather palm and back, size suitable for adults",
      "Palm Grip: High-traction rubber grip in palm facing, soft cloth lining in cuffs",
      "Durable Construction: Synthetic leather ensures longevity and maintains shape after regular use",
      "Closure: Wide wrist band with reliable fastening system keeps gloves firmly in place"
    ]
  },
  {
    id: "gloves-06",
    name: "MR Junior Wicket Keeping Gloves",
    category: "keeping-gloves",
    categoryName: "Keeping Gloves",
    price: 325,
    originalPrice: 450,
    badge: "Junior Keeping • High Grip",
    rating: 4.7,
    reviewsCount: 39,
    image: "images/gloves/glove-6.jpeg",
    shortDesc: "High-traction orange dimpled rubber catching face for sure ball gathering. Designed specifically with lightweight padded fingers for juvenile wicket keepers.",
    availability: "In Stock • Junior Spec",
    specifications: [
      "Direct Factory Price: ₹325",
      "Catching Face: High-traction dimpled orange rubber grip for confident catching",
      "Design: Lightweight orange & grey synthetic outer shell with natural flex cup",
      "Finger Protection: Padded fingers for junior impact safety against leather and tennis balls",
      "Cuff: Padded wrist cuff with comfortable easy-entry opening",
      "Target Group: School tournaments, junior cricket academies, and club training"
    ]
  },
  {
    id: "gloves-07",
    name: "MR Octopus Wicket Keeping Gloves",
    category: "keeping-gloves",
    categoryName: "Keeping Gloves",
    price: 590,
    originalPrice: 850,
    badge: "Octopus Grip • Pro Leather",
    rating: 4.9,
    reviewsCount: 46,
    image: "images/gloves/glove-7.jpeg",
    shortDesc: "High-density finger protection keeps hands safe. Ergonomic design lets hands move quickly, and PVC dotted octopus grip holds the ball firmly behind the stumps.",
    availability: "In Stock • Pro Keeping",
    specifications: [
      "Direct Factory Price: ₹590",
      "Top Highlights: High-density finger protection keeps hands safe",
      "Top Highlights: Ergonomic design lets hands move quickly",
      "Top Highlights: PVC dotted grip holds the ball firmly",
      "Premium Leather Construction: Durable leather wicket keeping gloves designed for long-lasting performance",
      "Finger Protection: Reinforced finger protection with high-density padding for enhanced safety behind the stumps",
      "Ergonomic Fit: Comfortable and flexible construction allows quick hand movement and natural positioning",
      "Enhanced Grip Technology: Specialized PVC dotted palm material provides confident catches and precise stumpings"
    ]
  },

  // ==========================================
  // LEG GUARDS (Batting Leg Guards)
  // Exact factory pricing from chats
  // ==========================================
  {
    id: "leg-01",
    name: "MR Pro Batting Leg Guards (White Wings)",
    category: "leg-guards",
    categoryName: "Leg Guards",
    price: 1500,
    originalPrice: 2200,
    badge: "Pro Series • Wing Edition",
    rating: 4.9,
    reviewsCount: 76,
    image: "images/leg-guards/guard-1.jpeg",
    images: [
      "images/leg-guards/guard-1.jpeg"
    ],
    shortDesc: "Premium white batting pads featuring MR wings insignia, contoured multi-layer knee bolster, and padded side protection against fast bowling.",
    availability: "In Stock • Top Tier Match Grade",
    specifications: [
      "Direct Factory Price: ₹1,500",
      "Front Face: Premium wipe-clean white PU face with reinforced vertical cane rods",
      "Knee Bolster: Gel-infused anatomical knee pocket with MR wings crest for snug knee lock",
      "Bolsters: Ergonomic padded mesh shin and thigh bolsters for high impact dispersion",
      "Straps: 2-inch wide padded calf strap and double ankle/thigh straps with heavy-duty Velcro",
      "Instep: Ballistic nylon reinforced wear-resistant instep"
    ]
  },
  {
    id: "leg-02",
    name: "MR Traditional Cane Match Batting Leg Guards",
    category: "leg-guards",
    categoryName: "Leg Guards",
    price: 650,
    originalPrice: 999,
    badge: "Traditional Cane",
    rating: 4.7,
    reviewsCount: 52,
    image: "images/leg-guards/guard-2.jpeg",
    images: [
      "images/leg-guards/guard-2.jpeg"
    ],
    shortDesc: "Classic 7-cane front face batting leg guards delivering time-tested impact protection, sturdy knee roll, and durable canvas/PU construction.",
    availability: "In Stock • Match Grade",
    specifications: [
      "Direct Factory Price: ₹650",
      "Construction: Traditional 7-cane structure for rigid impact dispersion against pace",
      "Knee Roll: 3-piece padded knee roll with shock absorption foam",
      "Shell: Wipe-clean white PU front face with red MR wings branding",
      "Strapping: Heavy-duty buckle and Velcro strapping system",
      "Profile: Standard fit suitable for all batting styles"
    ]
  },
  {
    id: "leg-03",
    name: "MR Platino Batting Leg Guards (Orange Trim)",
    category: "leg-guards",
    categoryName: "Leg Guards",
    price: 585,
    originalPrice: 899,
    badge: "Platino Edition",
    rating: 4.8,
    reviewsCount: 41,
    image: "images/leg-guards/guard-3.jpeg",
    images: [
      "images/leg-guards/guard-3.jpeg"
    ],
    shortDesc: "MR Platino lightweight batting pads with orange-accented top hat, mesh inner bolsters, and triple black adjustable straps for rapid running.",
    availability: "In Stock • Platino Series",
    specifications: [
      "Direct Factory Price: ₹585",
      "Model: MR Platino Match Batting Pad",
      "Face: Clean white front panel with orange and black geometric graphics",
      "Inner: Breathable mesh back bolsters for sweat management during long sessions",
      "Straps: 3 secure quick-adjust black velcro straps with buckle loops",
      "Instep: Curved padded instep for easy foot clearance and sprinting"
    ]
  },
  {
    id: "leg-04",
    name: "MR Club Batting Leg Guards (Blue Trim)",
    category: "leg-guards",
    categoryName: "Leg Guards",
    price: 767,
    originalPrice: 1150,
    badge: "Club Series • Blue Trim",
    rating: 4.8,
    reviewsCount: 48,
    image: "images/leg-guards/guard-4.jpeg",
    images: [
      "images/leg-guards/guard-4.jpeg"
    ],
    shortDesc: "High-density foam and cane batting pads with distinctive royal blue perimeter piping, deep knee cup, and reinforced ankle protection.",
    availability: "In Stock • Club Series",
    specifications: [
      "Direct Factory Price: ₹767",
      "Design: Full white front panel with royal blue border piping and MR logo",
      "Padding: Dense impact foam ribs with composite cane inserts",
      "Protection: Extended side-wing wrap for calf and knee protection",
      "Fit: Ergonomically shaped for right and left-hand batsmen",
      "Maintenance: Wipe-clean synthetic surface"
    ]
  },

  // ==========================================
  // PADS (Thigh & Body Protective Guards)
  // Exact factory pricing from chats
  // ==========================================
  {
    id: "pads-01",
    name: "MR Rock Thigh + Elbow Guard Combo (Black/Neon)",
    category: "pads",
    categoryName: "Pads",
    price: 430,
    originalPrice: 650,
    badge: "MR Rock • Combo",
    rating: 4.9,
    reviewsCount: 65,
    image: "images/pads/pad-1.jpeg",
    images: [
      "images/pads/pad-1.jpeg"
    ],
    shortDesc: "Premium MR Rock dual guard combo featuring contoured black outer shell, neon green impact cushion lining, and wide elastic straps.",
    availability: "In Stock • Thigh + Elbow Set",
    specifications: [
      "Direct Factory Price: ₹430 (Combo Set)",
      "Includes: 1 Pre-curved Thigh Guard + 1 Elbow / Arm Guard",
      "Outer: Heavy-duty pre-molded black impact plate with embossed red MR wings logo",
      "Inner Lining: Shock-absorbing neon green towel cushioning for sweat absorption",
      "Strapping: Dual wide elastic straps with high-grip Velcro closure",
      "Mobility: Anatomical curve hugs the leg without slipping"
    ]
  },
  {
    id: "pads-02",
    name: "MR Classic Thigh + Elbow Guard Set (White)",
    category: "pads",
    categoryName: "Pads",
    price: 190,
    originalPrice: 300,
    badge: "Value Combo • White",
    rating: 4.7,
    reviewsCount: 54,
    image: "images/pads/pad-2.jpeg",
    images: [
      "images/pads/pad-2.jpeg"
    ],
    shortDesc: "Ultra-affordable essential protective combo with cross-strap white thigh guard and MR branded elbow guard for club and net practice.",
    availability: "In Stock • Thigh + Elbow Set",
    specifications: [
      "Direct Factory Price: ₹190 (Combo Set)",
      "Includes: 1 Thigh Guard + 1 Elbow Guard",
      "Straps: Diagonal criss-cross elastic harness for non-slip leg positioning",
      "Padding: High-density protective foam with soft white fabric backing",
      "Elbow Guard: Form-fitted curved arm guard with printed MR logo",
      "Usage: Academy training, school leagues, and net practice"
    ]
  },
  {
    id: "pads-03",
    name: "MR Rock Light Thigh + Elbow Combo (Black)",
    category: "pads",
    categoryName: "Pads",
    price: 390,
    originalPrice: 550,
    badge: "Rock Light • Featherlite",
    rating: 4.8,
    reviewsCount: 39,
    image: "images/pads/pad-3.jpeg",
    images: [
      "images/pads/pad-3.jpeg"
    ],
    shortDesc: "Lightweight streamlined MR Rock Light thigh and elbow guard combination with sleek all-black ergonomic profile for rapid running between wickets.",
    availability: "In Stock • Thigh + Elbow Set",
    specifications: [
      "Direct Factory Price: ₹390 (Combo Set)",
      "Includes: 1 Thigh Guard + 1 Elbow Guard",
      "Series: MR Rock Light Featherlite Edition",
      "Material: Thermoformed lightweight EVA composite shell",
      "Fit: Triple adjustable velcro elastic straps for custom compression",
      "Mobility: Streamlined anatomical cut eliminates bulk during sprinting"
    ]
  },

  // ==========================================
  // HELMETS
  // Exact factory pricing from chats
  // ==========================================
  {
    id: "helmet-01",
    name: "MR Airflow Match Cricket Helmet (Blue Inner Mesh)",
    category: "helmets",
    categoryName: "Helmets",
    price: 495,
    originalPrice: 750,
    badge: "Blue Mesh • Pro Spec",
    rating: 4.9,
    reviewsCount: 89,
    image: "images/helmets/helmet-1/img-1.jpeg",
    images: [
      "images/helmets/helmet-1/img-1.jpeg",
      "images/helmets/helmet-1/img-2.jpeg"
    ],
    shortDesc: "Matte navy cloth-covered cricket helmet with royal blue breathable 3D inner mesh lining, hardened steel face grille, and 3 ventilation eyelets.",
    availability: "In Stock • Blue Mesh Edition",
    specifications: [
      "Direct Factory Price: ₹495",
      "Inner Lining: Royal blue high-cushion 3D honeycomb air-mesh lining",
      "Grille: High-tensile steel wire face grille with adjustable side screws",
      "Shell: Rigid high-impact polymer shell wrapped in navy twill fabric",
      "Ventilation: 3 aerodynamic overhead airflow eyelets for head cooling",
      "Chin Strap: Adjustable nylon strap with quick-release safety buckle"
    ]
  },
  {
    id: "helmet-02",
    name: "MR Club Protective Cricket Helmet (Yellow Inner Mesh)",
    category: "helmets",
    categoryName: "Helmets",
    price: 430,
    originalPrice: 650,
    badge: "Yellow Mesh • Club Spec",
    rating: 4.8,
    reviewsCount: 47,
    image: "images/helmets/helmet-2/img-1.jpeg",
    images: [
      "images/helmets/helmet-2/img-1.jpeg",
      "images/helmets/helmet-2/img-2.jpeg"
    ],
    shortDesc: "Durable navy twill match helmet with bright yellow inner sweat-absorbing mesh lining, full steel grille, and padded chin cup.",
    availability: "In Stock • Yellow Mesh Edition",
    specifications: [
      "Direct Factory Price: ₹430",
      "Inner Lining: High-visibility yellow sweat-absorbing air mesh lining",
      "Grille: Powder-coated steel wire grille offering wide panoramic vision",
      "Shell: Shock-dissipating injection molded shell with classic fabric cover",
      "Ventilation: Multi-port overhead cooling vents",
      "Protection: Padded chin strap with molded chin cup"
    ]
  },
  {
    id: "helmet-03",
    name: "MR Adjustable Pro Segmented Cricket Helmet",
    category: "helmets",
    categoryName: "Helmets",
    price: 1100,
    originalPrice: 1650,
    badge: "Adjustable Fit • Pro Segmented",
    rating: 5.0,
    reviewsCount: 34,
    image: "images/helmets/helmet-3/img-1.jpeg",
    images: [
      "images/helmets/helmet-3/img-1.jpeg",
      "images/helmets/helmet-3/img-2.jpeg"
    ],
    shortDesc: "High-protection cricket helmet with segmented grey EVA perimeter foam cushions, dial/strap adjustable fit system, and steel grille.",
    availability: "In Stock • Adjustable Fit",
    specifications: [
      "Direct Factory Price: ₹1,100",
      "Adjustment: Adjustable size system for custom snug fit",
      "Impact Cushioning: Multi-segmented high-density grey EVA foam inner pads",
      "Grille: Reinforced steel wire cage with extended cheek protection",
      "Shell: Heavy-duty ABS shell covered in premium navy fabric",
      "Comfort: Removable sweat-wicking forehead and side bolsters"
    ]
  },
  {
    id: "helmet-04",
    name: "MR Non-Adjustable Match Cricket Helmet",
    category: "helmets",
    categoryName: "Helmets",
    price: 975,
    originalPrice: 1450,
    badge: "Non-Adjustable • Heavy Foam",
    rating: 4.7,
    reviewsCount: 58,
    image: "images/helmets/helmet-4/img-1.jpeg",
    images: [
      "images/helmets/helmet-4/img-1.jpeg",
      "images/helmets/helmet-4/img-2.jpeg"
    ],
    shortDesc: "Rugged fixed-size match helmet with dense segmented EVA foam internal protection and steel grille for club matches and net sessions.",
    availability: "In Stock • Non-Adjustable",
    specifications: [
      "Direct Factory Price: ₹975",
      "Type: Non-adjustable fixed-size match helmet",
      "Inner Foam: Deep segmented EVA foam lining with star center cushion",
      "Grille: Hardened steel face guard with secure screw mounts",
      "Exterior: Premium woven navy exterior with embossed MR wing crest",
      "Chinstrap: Padded chin support with heavy-duty snap buckle"
    ]
  },

  // ==========================================
  // BALLS (Leather Cricket Balls)
  // Exact 20, 30, 40 Overs Pricing from Chats
  // ==========================================
  {
    id: "balls-01",
    name: "MR Tournament White Leather Match Cricket Ball",
    category: "balls",
    categoryName: "Cricket Balls",
    price: 220,
    originalPrice: 320,
    badge: "20 / 30 / 40 Overs",
    rating: 4.9,
    reviewsCount: 86,
    image: "images/balls/ball-1.jpeg",
    images: [
      "images/balls/ball-1.jpeg"
    ],
    variants: [
      {
        overs: "20 Overs",
        oversKey: "20",
        label: "20 Overs (T20 Spec)",
        price: 220,
        originalPrice: 320,
        badge: "20 Overs • ₹220",
        durabilityText: "20 Overs Match Seam Guarantee",
        description: "White 4-piece leather match ball engineered for 20-over T20 matches with sharp seam rebound.",
        specs: "Alum-tanned white steer hide • Compressed cork core • 20-over certified"
      },
      {
        overs: "30 Overs",
        oversKey: "30",
        label: "30 Overs (Tournament Spec)",
        price: 260,
        originalPrice: 380,
        badge: "30 Overs • ₹260",
        durabilityText: "30 Overs Tournament Seam Guarantee",
        description: "Hardened 4-piece white leather outer built for 30-over tournaments with prolonged seam integrity.",
        specs: "High-density cork winding • Reinforced hand seam • 30-over tournament grade"
      },
      {
        overs: "40 Overs",
        oversKey: "40",
        label: "40 Overs (Match Spec)",
        price: 300,
        originalPrice: 450,
        badge: "40 Overs • ₹300",
        durabilityText: "40 Overs Match Seam Guarantee",
        description: "Top-grade white leather built to endure 40 overs of high-impact play without shape distortion.",
        specs: "Top selection steer hide • 5-layer cork core • Wax sealed finish"
      }
    ],
    shortDesc: "High-grade 4-piece white leather match ball available in 20 Overs (₹220), 30 Overs (₹260), and 40 Overs (₹300) specifications with guaranteed seam prominence.",
    availability: "In Stock • Factory Direct",
    specifications: [
      "Factory Direct Prices: 20 Overs: ₹220 | 30 Overs: ₹260 | 40 Overs: ₹300",
      "Leather: First selection alum-tanned white steer hide with waterproof polish",
      "Core: Multi-layered Portuguese compressed cork and wool winding",
      "Seam: Hand-stitched with reinforced seam for prolonged lateral movement",
      "Application: Day/night matches, white ball tournaments, club leagues"
    ]
  },
  {
    id: "balls-02",
    name: "MR Pro Match Red Leather Cricket Ball",
    category: "balls",
    categoryName: "Cricket Balls",
    price: 210,
    originalPrice: 300,
    badge: "20 / 30 / 40 Overs",
    rating: 4.9,
    reviewsCount: 112,
    image: "images/balls/ball-2.jpeg",
    images: [
      "images/balls/ball-2.jpeg"
    ],
    variants: [
      {
        overs: "20 Overs",
        oversKey: "20",
        label: "20 Overs (Club Spec)",
        price: 210,
        originalPrice: 300,
        badge: "20 Overs • ₹210",
        durabilityText: "20 Overs Match Seam Guarantee",
        description: "Deep red alum-tanned 4-piece leather ball built for 20-over club and academy matches.",
        specs: "Alum-tanned red steer hide • Portuguese cork core • Sharp seam"
      },
      {
        overs: "30 Overs",
        oversKey: "30",
        label: "30 Overs (Tournament Spec)",
        price: 250,
        originalPrice: 360,
        badge: "30 Overs • ₹250",
        durabilityText: "30 Overs Tournament Seam Guarantee",
        description: "Wax-polished red match ball providing optimal grip and seam stability for 30-over fixtures.",
        specs: "4-layer cork winding • Precision hand-stitched seam • 30-over durability"
      },
      {
        overs: "40 Overs",
        oversKey: "40",
        label: "40 Overs (Championship Spec)",
        price: 290,
        originalPrice: 420,
        badge: "40 Overs • ₹290",
        durabilityText: "40 Overs Match Seam Guarantee",
        description: "Grade 1 championship match red leather ball built to maintain hard seam prominence for full 40 overs.",
        specs: "5-layer virgin cork core • Hand-waxed finish • Shape retention guarantee"
      }
    ],
    shortDesc: "Master alum-tanned deep red leather match ball available in 20 Overs (₹210), 30 Overs (₹250), and 40 Overs (₹290) variants directly from the Meerut atelier.",
    availability: "In Stock • Factory Direct",
    specifications: [
      "Factory Direct Prices: 20 Overs: ₹210 | 30 Overs: ₹250 | 40 Overs: ₹290",
      "Leather: Hand-selected alum-tanned deep red steer hide",
      "Core: 5-layer compressed Portuguese cork & pure wool winding",
      "Finish: Waterproof wax polish ensuring seam prominence and genuine swing",
      "Application: Multi-day matches, weekend league fixtures, academy tournaments"
    ]
  },

  // ==========================================
  // BAGS (Kit Bags)
  // Exact factory pricing from chats
  // ==========================================
  {
    id: "bags-01",
    name: "MR Junior Trolley Kit Bag",
    category: "bags",
    categoryName: "Kit Bags",
    price: 560,
    originalPrice: 850,
    badge: "Junior Trolley • 6 Views",
    rating: 4.9,
    reviewsCount: 42,
    image: "images/bags/bag-1/img-1.jpeg",
    images: [
      "images/bags/bag-1/img-1.jpeg",
      "images/bags/bag-1/img-2.jpeg",
      "images/bags/bag-1/img-3.jpeg",
      "images/bags/bag-1/img-4.jpeg",
      "images/bags/bag-1/img-5.jpeg",
      "images/bags/bag-1/img-6.jpeg"
    ],
    shortDesc: "Compact junior trolley cricket bag with retractable pull handle, dual smooth roller wheels, and dedicated compartments for complete junior kit.",
    availability: "In Stock • Junior Trolley",
    specifications: [
      "Direct Factory Price: ₹560",
      "Series: MR Junior Kit Bag (Trolley)",
      "Material: Durable heavy-duty water-resistant nylon fabric",
      "Trolley System: Sturdy telescopic pull handle and dual smooth roller wheels",
      "Compartments: Main holdall for pads/helmet/gloves + side bat pocket",
      "Carrying: Padded shoulder straps and grab handle"
    ]
  },
  {
    id: "bags-02",
    name: "MR Jr Blaze Camo Duffle Kit Bag",
    category: "bags",
    categoryName: "Kit Bags",
    price: 560,
    originalPrice: 850,
    badge: "Jr Blaze • Camo Duffle",
    rating: 4.8,
    reviewsCount: 31,
    image: "images/bags/bag-2/img-1.jpeg",
    images: [
      "images/bags/bag-2/img-1.jpeg",
      "images/bags/bag-2/img-2.jpeg"
    ],
    shortDesc: "Rugged camouflage print junior duffle bag with bold MR logo, external bat holder sleeve, and comfortable backpack shoulder straps.",
    availability: "In Stock • Jr Duffle",
    specifications: [
      "Direct Factory Price: ₹560",
      "Model: MR Jr Blaze Duffle Bag",
      "Pattern: Military digital camouflage print with black contrast panels",
      "Bat Pocket: Dedicated external vertical bat storage sleeve",
      "Shoulder Straps: Ergonomic padded backpack harness for easy transport",
      "Dimensions: Sized perfectly for junior cricketers and academy nets"
    ]
  },
  {
    id: "bags-03",
    name: "MR Select Boy & Man Duffle Kit Bag (Red/Black)",
    category: "bags",
    categoryName: "Kit Bags",
    price: 1300,
    originalPrice: 1950,
    badge: "Boy & Man • Select",
    rating: 4.9,
    reviewsCount: 36,
    image: "images/bags/bag-3/img-1.jpeg?v=20261026_5",
    images: [
      "images/bags/bag-3/img-1.jpeg?v=20261026_5"
    ],
    shortDesc: "Spacious stand-up duffle kit bag for boys and senior players in striking red and black styling. Holds complete batting equipment set.",
    availability: "In Stock • Boy & Man Size",
    specifications: [
      "Direct Factory Price: ₹1,300",
      "Model: MR Select Boy & Man Stand-Up Duffle Bag",
      "Capacity: Full cricket equipment set (pads, helmet, gloves, accessories)",
      "Zippers: Heavy duty non-catch zips with dual sliders and shoe section",
      "Fabric: High-tensile water-resistant woven polyester with reinforced base",
      "Carrying: Dual cushioned backpack straps and heavy-duty grab handle"
    ]
  },
  {
    id: "bags-04",
    name: "MR Stanford Cobra 2.0 Wheelie Kit Bag",
    category: "bags",
    categoryName: "Kit Bags",
    price: 1400,
    originalPrice: 2100,
    badge: "Wheelie • Boy & Man",
    rating: 5.0,
    reviewsCount: 44,
    image: "images/bags/bag-4/img-1.jpeg",
    images: [
      "images/bags/bag-4/img-1.jpeg",
      "images/bags/bag-4/img-2.jpeg"
    ],
    shortDesc: "Heavy-duty full-size wheelie kit bag for boys and men with tractor roller wheels, multiple side pockets, and backpack carry straps.",
    availability: "In Stock • Wheelie Edition",
    specifications: [
      "Direct Factory Price: ₹1,400",
      "Model: Stanford Cobra 2.0 Kit with Wheel (Boys & Man Kit)",
      "Wheels: Dual heavy-duty tractor wheels with reinforced bottom skids",
      "Straps: Dual padded backpack straps for versatility (wheel or shoulder carry)",
      "Pockets: 3 deep zippered side pockets + top compartment + main holdall",
      "Capacity: Senior full kit capacity including bats, pads, gloves, and helmet"
    ]
  },
  {
    id: "bags-05",
    name: "MR Junior Stand-Up Duffle Kit Bag (Navy)",
    category: "bags",
    categoryName: "Kit Bags",
    price: 670,
    originalPrice: 999,
    badge: "Jr Duffle • Navy",
    rating: 4.8,
    reviewsCount: 28,
    image: "images/bags/bag-5/img-1.jpeg",
    images: [
      "images/bags/bag-5/img-1.jpeg",
      "images/bags/bag-5/img-2.jpeg"
    ],
    shortDesc: "Upright junior duffle bag in navy blue with side bat sleeve, zippered shoe tunnel, and cushioned dual shoulder backpack straps.",
    availability: "In Stock • Junior Spec",
    specifications: [
      "Direct Factory Price: ₹670",
      "Model: MR Junior Duffle Bag (Navy)",
      "Design: Upright stand-up tower construction with rigid internal shape",
      "Pockets: Deep front pocket + side bat holder sleeve + separate shoe pocket",
      "Straps: Padded breathable back straps for easy carrying to nets",
      "Fabric: Tough tear-resistant navy canvas with reinforced stitching"
    ]
  }
];

// Fallback high-res cricket SVG illustration in case of network issues
const fallbackCricketImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600' width='600' height='600'%3E%3Crect width='600' height='600' fill='%23ffffff'/%3E%3Crect x='20' y='20' width='560' height='560' fill='none' stroke='%23f8c8cf' stroke-width='2'/%3E%3Ccircle cx='300' cy='260' r='110' fill='%23fff5f6' stroke='%23c8102e' stroke-width='3'/%3E%3Cpath d='M235 325 L365 195 M245 335 L375 205' stroke='%23c8102e' stroke-width='6' stroke-linecap='round'/%3E%3Ccircle cx='300' cy='260' r='16' fill='%23c8102e'/%3E%3Ctext x='300' y='425' font-family='Georgia, serif' font-size='22' font-weight='bold' fill='%23c8102e' text-anchor='middle' letter-spacing='3'%3EMR SPORTS%3C/text%3E%3Ctext x='300' y='460' font-family='sans-serif' font-size='13' font-weight='600' fill='%23b83245' text-anchor='middle' letter-spacing='2'%3EPREMIUM CRICKET GEAR%3C/text%3E%3C/svg%3E";
