/**
 * CREATIVIZR - Main Application Scripts
 * Brand Slogan: "To the Maximum of Creativity"
 * Coordinates Services Popup (Auto 5-slide show, Order, Back, Wishlist),
 * Recent Work Carousel, Wishlist / Cart Drawer, Contact Form, and 3D Scene
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Hero Fullscreen Video Autoplay
  initHeroVideo();

  // 2. Initialize Dark / Light Mode Theme Toggle
  initThemeToggle();

  // 3. Initialize Header Navigation & Mobile Menu
  initNavigation();

  // 4. Initialize Services Showcase & Detail Modal
  initServicesModal();

  // 5. Initialize Services Card Hover Slideshow (Auto 5-photo slideshow on 1s delay)
  initCardHoverSlideshow();

  // 6. Initialize Wishlist / Cart System (Header, Drawer, Modal & Card Buttons)
  initWishlistSystem();

  // 7. Initialize Recent Work Auto Slideshow & Interactive Scroll
  initRecentWorkShowcase();

  // 8. Initialize Contact Form (Sends to creativizrdesigns@gmail.com)
  initContactSystem();
});

/* ==========================================================================
   SERVICES DATA STORE (9 Categories with 5 High-Res Showcase Slides Each)
   ========================================================================== */
const SERVICES_DATA = [
  {
    id: 'logo-design',
    name: 'Logo Design',
    category: 'Brand Identity',
    coverPhoto: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=80',
    shortDesc: 'Iconic, memorable vector logos crafted to make your brand instantly recognizable.',
    fullDesc: 'We craft timeless, distinctive logotypes and symbols engineered for maximum memorability and cross-platform flexibility. From minimalist emblems and geometric marks to luxury monograms and dynamic 3D lockups, your logo will look razor sharp at 16 pixels or 50 feet wide on a billboard.',
    deliverables: [
      'Original Vector Master Files (AI, EPS, SVG, PDF)',
      'High-Resolution Transparent PNGs & JPEGs (RGB & CMYK)',
      'Horizontal, Stacked, and Favicon/Icon App Variants',
      'Monochrome, Inverted & Full-Color Colorways',
      'Full Commercial Copyright & Ownership Transfer',
      'Unlimited Revisions for Guaranteed Satisfaction'
    ],
    slides: [
      {
        url: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=900&auto=format&fit=crop&q=80',
        title: 'Minimalist Vector Logomark',
        caption: 'Golden ratio geometric construction for high-tech ventures'
      },
      {
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&auto=format&fit=crop&q=80',
        title: '3D Monogram & Abstract Emblem',
        caption: 'Dynamic fluid visual mark engineered for modern digital branding'
      },
      {
        url: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=900&auto=format&fit=crop&q=80',
        title: 'Luxury Corporate Wordmark',
        caption: 'Bespoke kerning and typography for executive elegance'
      },
      {
        url: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=900&auto=format&fit=crop&q=80',
        title: 'Chromatic Badge & Mascot Lockup',
        caption: 'High-voltage styling for creative studios and apparel'
      },
      {
        url: 'https://images.unsplash.com/photo-1542744094-3a3172720a46?w=900&auto=format&fit=crop&q=80',
        title: 'Comprehensive Logo Suite & Guidelines',
        caption: 'Full responsive lockups across mobile, web, and physical merch'
      }
    ]
  },
  {
    id: 'brand-guides',
    name: 'Brand Style Guides',
    category: 'Brand Architecture',
    coverPhoto: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&auto=format&fit=crop&q=80',
    shortDesc: 'Comprehensive brand manuals defining typography, colors, spacing, and voice.',
    fullDesc: 'A great brand needs strict consistency. We produce exhaustive, easy-to-follow brand identity books that empower your internal team and external partners to maintain flawless design integrity across every single marketing touchpoint.',
    deliverables: [
      'Comprehensive 25+ Page Brand Guideline PDF Book',
      'Precise Color Systems (Pantone, CMYK, RGB, HEX)',
      'Primary & Secondary Typographic Pairing Rules',
      'Logo Exclusion Zones, Minimum Sizes & Misuse Rules',
      'Stationery & Merchandise Placement Standards',
      'Interactive Figma / InDesign Master Template'
    ],
    slides: [
      {
        url: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=900&auto=format&fit=crop&q=80',
        title: 'Editorial Brand Manual Layout',
        caption: 'Crisp grid structure detailing layout specifications and margins'
      },
      {
        url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=900&auto=format&fit=crop&q=80',
        title: 'Pantone & HEX Color Harmony Book',
        caption: 'Strict contrast ratios, dark-mode adaptations, and accent accents'
      },
      {
        url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=900&auto=format&fit=crop&q=80',
        title: 'Typographic Hierarchy & Font Specs',
        caption: 'Display headlines, body tracking, and digital font licensing rules'
      },
      {
        url: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=900&auto=format&fit=crop&q=80',
        title: 'Corporate Stationery System',
        caption: 'Letterheads, envelopes, badges, and digital presentation slides'
      },
      {
        url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&auto=format&fit=crop&q=80',
        title: 'Digital UI Asset Library',
        caption: 'Complete iconography and social media avatar standards'
      }
    ]
  },
  {
    id: 'ui-ux',
    name: 'Website and App UI/UX',
    category: 'Digital Product Design',
    coverPhoto: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    shortDesc: 'Intuitive, high-converting digital interfaces for web platforms and mobile apps.',
    fullDesc: 'We architect frictionless user journeys and visually captivating interfaces in Figma and Flutter. Whether you need a high-conversion landing page, a complex SaaS dashboard, or a fluid mobile app, we balance aesthetic elegance with UX best practices.',
    deliverables: [
      'Interactive Clickable Prototypes in Figma',
      'Component-Based Auto-Layout Design System',
      'Pixel-Perfect Responsive Layouts (Desktop, Tablet, Mobile)',
      'Micro-Interactions & Animation Specifications',
      'Design Token Export (Colors, Typography, Shadows)',
      'Developer Hand-Off Ready with Flutter / Web Guides'
    ],
    slides: [
      {
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=80',
        title: 'SaaS Analytics Dashboard',
        caption: 'Ultra-clean dark mode UI with real-time financial data visualization'
      },
      {
        url: 'https://images.unsplash.com/photo-1581291518655-9523c932edcf?w=900&auto=format&fit=crop&q=80',
        title: 'Mobile App Screen Suite',
        caption: 'Ergonomic iOS and Android UX tailored for thumb reach and speed'
      },
      {
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop&q=80',
        title: 'High-Conversion Landing Page',
        caption: 'Persuasive typographic hierarchy, clear CTAs, and modern layout'
      },
      {
        url: 'https://images.unsplash.com/photo-1542744095-291d1f67b221?w=900&auto=format&fit=crop&q=80',
        title: 'Figma Design System Architecture',
        caption: 'Reusable atomic components, variants, and design tokens'
      },
      {
        url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=900&auto=format&fit=crop&q=80',
        title: 'E-Commerce Checkout Flow',
        caption: 'Zero-friction payment screens and product showcase layouts'
      }
    ]
  },
  {
    id: 'flyers',
    name: 'Social Media Flyers',
    category: 'Marketing Graphics',
    coverPhoto: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
    shortDesc: 'High-energy, attention-grabbing flyers tailored for Instagram, Facebook, and print.',
    fullDesc: 'Stop the scroll and pack your events. We engineer explosive social media flyers, promotional graphics, and club/corporate announcements that command attention in crowded newsfeeds and print storefronts.',
    deliverables: [
      'Square Post (1:1), Story (9:16), and Banner (16:9) Formats',
      'Print-Ready 300 DPI CMYK Files with Bleed Marks',
      'Layered Photoshop (PSD) & Illustrator (AI) Source Files',
      'Optimized WebP & JPEG for Instant Social Upload',
      'Event Lineup & Speaker Layout Customizations',
      'Fast 24-48 Hour Turnaround Available'
    ],
    slides: [
      {
        url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=900&auto=format&fit=crop&q=80',
        title: 'Nightclub & DJ Concert Flyer',
        caption: 'Cyberpunk neon lighting, bold 3D typography, and artist spotlight'
      },
      {
        url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&auto=format&fit=crop&q=80',
        title: 'Outdoor Music Festival Poster',
        caption: 'Dynamic festival branding with tiered headliner typography'
      },
      {
        url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=900&auto=format&fit=crop&q=80',
        title: 'Corporate Conference & Expo Flyer',
        caption: 'Polished executive branding for seminars, summits, and webinars'
      },
      {
        url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=900&auto=format&fit=crop&q=80',
        title: 'Promotional Product Launch Ad',
        caption: 'High-contrast promotional artwork tailored for Instagram Sponsored Ads'
      },
      {
        url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=900&auto=format&fit=crop&q=80',
        title: 'Seasonal Sale & Retail Flyer',
        caption: 'Bold discount badge graphics and urgent call-to-action treatments'
      }
    ]
  },
  {
    id: 'book-covers',
    name: 'Book / Tute Covers',
    category: 'Editorial & Publishing',
    coverPhoto: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
    shortDesc: 'Captivating front, back, and spine covers for novels, academic tutorials, and guides.',
    fullDesc: 'Readers judge books by their covers every day. We design arresting book and tutorial covers that stand out on Amazon Kindle, bookstores, and school desks. Full wrap dielines with barcode integration, spine calculation, and foil effects.',
    deliverables: [
      'Full Wrap Cover (Front, Back, Spine calculated to page count)',
      'Amazon KDP, IngramSpark & Print-Ready PDF/X Specs',
      'High-Resolution E-Book Cover for Kindle, Apple Books, Kobo',
      'Realistic 3D Paperback & Hardcover Render Mockups',
      'Layered InDesign (INDD) & Photoshop (PSD) Source Files',
      'Barcode & ISBN Placement Calibration'
    ],
    slides: [
      {
        url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=900&auto=format&fit=crop&q=80',
        title: 'Minimalist Modern Literature Cover',
        caption: 'High-end Swiss typography paired with poignant conceptual art'
      },
      {
        url: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777f?w=900&auto=format&fit=crop&q=80',
        title: 'Academic Tutorial & Guide Series',
        caption: 'Structured color-coded system for educational modules and exams'
      },
      {
        url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=900&auto=format&fit=crop&q=80',
        title: 'Sci-Fi & Thriller Novel Jacket',
        caption: 'Cinematic photo manipulation with textured foil stamping accents'
      },
      {
        url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=900&auto=format&fit=crop&q=80',
        title: 'Business & Self-Help Bestseller Cover',
        caption: 'Bold title treatment designed for instant thumbnail readability'
      },
      {
        url: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=900&auto=format&fit=crop&q=80',
        title: 'Complete Wrap Dieline with Spine & Back',
        caption: 'Precise spine millimeter calculation and blurb typography'
      }
    ]
  },
  {
    id: 'album-covers',
    name: 'Album Covers',
    category: 'Music Art Direction',
    coverPhoto: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
    shortDesc: 'Striking vinyl, CD, and Spotify digital album art that captures sound visually.',
    fullDesc: 'Give your music the visual identity it deserves. From indie vinyl record jackets to Spotify canvas animations and electronic single artwork, we blend artistic vision with sound culture.',
    deliverables: [
      '3000 x 3000 PX Spotify & Apple Music Approved Art',
      '12-Inch Vinyl Record Jacket & Inner Sleeve Dieline',
      'CD Jewel Case & Digipak Print Files with 300 DPI Bleed',
      'Animated Spotify Canvas 9:16 Looping MP4 Video',
      'Social Media Tracklist & Release Announcement Kit',
      'Layered PSD & Illustrator Working Master Files'
    ],
    slides: [
      {
        url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=900&auto=format&fit=crop&q=80',
        title: 'Gatefold Vinyl Record Presentation',
        caption: 'Full collector-edition outer sleeve with custom foil badge'
      },
      {
        url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=900&auto=format&fit=crop&q=80',
        title: 'Synthwave & Electronic EP Visual',
        caption: 'Retro-futuristic neon chromaticism and custom typography'
      },
      {
        url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=900&auto=format&fit=crop&q=80',
        title: 'Hip-Hop & Trap Single Cover',
        caption: 'High-contrast gritty photography with embossed gold logo lockup'
      },
      {
        url: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=900&auto=format&fit=crop&q=80',
        title: 'Ambient & Lo-Fi Acoustic Art',
        caption: 'Subtle painterly textures and analog grain aesthetics'
      },
      {
        url: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=900&auto=format&fit=crop&q=80',
        title: 'Complete Release Merch & Single Suite',
        caption: 'Vinyl center labels, cassette J-cards, and tour posters'
      }
    ]
  },
  {
    id: 'banners',
    name: 'Banners',
    category: 'Large Format & Advertising',
    coverPhoto: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&auto=format&fit=crop&q=80',
    shortDesc: 'Expo rollup banners, street billboards, and responsive digital advertising headers.',
    fullDesc: 'Make an undeniable statement at scale. We design high-resolution vector banners for trade shows, retail store rollups, sports events, billboards, and website headers engineered for maximum viewing distance impact.',
    deliverables: [
      'Large Format Print Ready (CMYK, 150-300 DPI, Vector Paths)',
      'Rollup Banner Specs (Standard 33x81 Inch, 85x200 CM)',
      'Billboard & Building Wrap Vector Architecture',
      'Web Banner Sizes (Google Ad Display Specs + Social Banners)',
      'CorelDRAW & Illustrator Print Calibration Files',
      'High-Res 3D On-Site Mockup Previews'
    ],
    slides: [
      {
        url: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=900&auto=format&fit=crop&q=80',
        title: 'High-Way Billboard Advertising',
        caption: 'Clear bold typography engineered for 3-second highway readability'
      },
      {
        url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=900&auto=format&fit=crop&q=80',
        title: 'Trade Show Rollup Banner Stand',
        caption: 'Eye-level value propositions and clean QR code lead capture'
      },
      {
        url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&auto=format&fit=crop&q=80',
        title: 'Exhibition Booth Backdrop & Podium',
        caption: 'Cohesive 10-foot panoramic backdrop for international summits'
      },
      {
        url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&auto=format&fit=crop&q=80',
        title: 'Website Hero & E-Commerce Banners',
        caption: 'Responsive web display headers for desktop and smartphone'
      },
      {
        url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&auto=format&fit=crop&q=80',
        title: 'Retail Storefront Hanging Banner',
        caption: 'Vibrant double-sided banner graphics with grommet markers'
      }
    ]
  },
  {
    id: 'business-cards',
    name: 'Business Cards',
    category: 'Corporate Stationery',
    coverPhoto: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format&fit=crop&q=80',
    shortDesc: 'Luxury tactile cards featuring spot UV, foil stamping, matte black, and embossing.',
    fullDesc: 'Make every handshake memorable. We design bespoke, executive-level business cards that feel substantial in the hand and leave an enduring impression of credibility and elite craftsmanship.',
    deliverables: [
      'Standard & Custom Die-Cut Sizes (Standard 3.5x2, Square, Vertical)',
      'Spot UV, Hot Foil Stamping & Blind Deboss Separation Masks',
      'Double-Sided Print-Ready Vector PDF with 3mm Bleed',
      'Interactive Digital NFC / vCard QR Code Integration',
      'Editable Illustrator (AI) & PSD Source Files',
      'Multiple Employee Name Adaptations Included'
    ],
    slides: [
      {
        url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=900&auto=format&fit=crop&q=80',
        title: 'Matte Black Velvet with Gold Foil',
        caption: 'Deep tactile luxury aesthetic with reflective metallic foil'
      },
      {
        url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=900&auto=format&fit=crop&q=80',
        title: 'Minimalist Clean White Letterpress',
        caption: 'Crisp embossed typography on thick 600 GSM cotton stock'
      },
      {
        url: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=900&auto=format&fit=crop&q=80',
        title: 'Vertical Creative Studio Cards',
        caption: 'Modern vertical orientation with vibrant color-edge painted sides'
      },
      {
        url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=900&auto=format&fit=crop&q=80',
        title: 'Spot Gloss & Holographic Cards',
        caption: 'Selective UV gloss varnish over sleek monochrome patterns'
      },
      {
        url: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=900&auto=format&fit=crop&q=80',
        title: 'Complete Executive Stationery Suite',
        caption: 'Matching envelope seal, letterhead, and VIP access card'
      }
    ]
  },
  {
    id: 'packaging',
    name: 'Product Packaging',
    category: 'Packaging & 3D Dielines',
    coverPhoto: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80',
    shortDesc: 'Unboxing experiences, structural box dielines, pouch bags, and bottle labels.',
    fullDesc: 'Transform everyday goods into covetable retail icons. We combine structural dieline precision with shelf-stopping visual graphics for cosmetics, foods, beverages, electronics, and luxury supplements.',
    deliverables: [
      '100% Accurate Vector Dielines with Cut, Crease, and Bleed Lines',
      'Realistic 3D Photorealistic Product Render Mockups (3 Angles)',
      'Pre-Press CMYK + Pantone Spot Calibration Files',
      'Nutrition / Ingredients Typography Standards & Barcode Setup',
      'Finishing Masks for Embossing, Spot UV & Foil Stamping',
      'Direct Printer Communication Support'
    ],
    slides: [
      {
        url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900&auto=format&fit=crop&q=80',
        title: 'Luxury Cosmetic Jar & Rigid Box',
        caption: 'Minimalist frosted bottle with gold foil stamped rigid box packaging'
      },
      {
        url: './assets/images/project1_aethera.jpg',
        title: 'Aethera Obsidian Glass Bottle Packaging',
        caption: 'Bespoke geometric glass vessel with fluorescent yellow typographic accents'
      },
      {
        url: './assets/images/project3_neonnova.jpg',
        title: 'Neon Nova Tactical Beverage Can',
        caption: 'Matte black aluminum can with holographic purple foiling & dielines'
      },
      {
        url: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=900&auto=format&fit=crop&q=80',
        title: 'Artisan Coffee Pouch & Bag Dielines',
        caption: 'Matte kraft pouch packaging with modern botanical vector illustrations'
      },
      {
        url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&auto=format&fit=crop&q=80',
        title: 'Eco-Luxury Unboxing Retail Box',
        caption: 'Sustainable folding carton with custom interior pattern print'
      }
    ]
  }
];

/* ==========================================================================
   RECENT WORK DATA STORE (5 Projects with Auto Slideshow & Descriptions)
   ========================================================================== */
const RECENT_WORK_DATA = [
  {
    title: 'Aethera Future Skincare',
    category: 'Product Packaging & Brand Identity',
    image: './assets/images/project1_aethera.jpg',
    year: '2026',
    desc: 'Obsidian geometric glass vessel with glowing fluorescent yellow micro-typography, paired with an executive monolithic brand system.'
  },
  {
    title: 'Apex Global Fintech UI/UX',
    category: 'Website & App UI/UX (Figma)',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=80',
    year: '2026',
    desc: 'Complete responsive web dashboard and native mobile app with dark-mode elegance, micro-animations, and high-conversion flows.'
  },
  {
    title: 'Neon Nova Tactical Energy',
    category: 'Product Packaging & Dielines',
    image: './assets/images/project3_neonnova.jpg',
    year: '2025',
    desc: 'Matte black tactical can architecture featuring holographic purple foil stamping, water condensation CGI, and UV neon accents.'
  },
  {
    title: 'Solaris Global Music Festival',
    category: 'Social Media Flyers & Banners',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=900&auto=format&fit=crop&q=80',
    year: '2026',
    desc: 'Complete campaign identity suite including animated Instagram story flyers, printed 10-foot stage banners, and VIP passes.'
  },
  {
    title: 'Synthesis Kinetic Architecture',
    category: 'Brand Style Guides & Typography',
    image: './assets/images/project2_synthesis.jpg',
    year: '2025',
    desc: '60-page comprehensive corporate brand manual, luxury letterpress business cards, and proprietary variable typography.'
  }
];

/* ==========================================================================
   HERO BACKGROUND VIDEO SYSTEM (Autoplay, Loop, Fullscreen Cover)
   ========================================================================== */
function initHeroVideo() {
  const video = document.getElementById('hero-bg-video');
  if (!video) return;

  // Modern browsers require video to be strictly muted for autoplay
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');
  video.setAttribute('loop', '');
  video.loop = true;

  // Ensure video source is assigned
  if (!video.src && !video.currentSrc) {
    video.src = './background/background.mp4';
  }

  const attemptPlay = () => {
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        // Autoplay succeeded
      }).catch(() => {
        // Autoplay policy prevented playback until user interaction
        const startOnUserInteraction = () => {
          video.muted = true;
          video.play().catch(() => {});
          ['click', 'touchstart', 'scroll', 'keydown', 'mousemove'].forEach(evt => {
            window.removeEventListener(evt, startOnUserInteraction);
          });
        };

        ['click', 'touchstart', 'scroll', 'keydown', 'mousemove'].forEach(evt => {
          window.addEventListener(evt, startOnUserInteraction, { once: true, passive: true });
        });
      });
    }
  };

  // Try immediately
  attemptPlay();

  // Also listen for media readiness events
  video.addEventListener('loadedmetadata', attemptPlay, { once: true });
  video.addEventListener('canplay', attemptPlay, { once: true });
  video.addEventListener('canplaythrough', attemptPlay, { once: true });

  // Handle visibility changes so video resumes smoothly if user switches tabs
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && video.paused) {
      attemptPlay();
    }
  });

  // Ensure seamless looping
  video.addEventListener('ended', () => {
    video.currentTime = 0;
    attemptPlay();
  });
}

/* ==========================================================================
   THEME TOGGLE SYSTEM (Dark / Light Mode)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const savedTheme = localStorage.getItem('creativizr_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('creativizr_theme', newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
    });
  }
}

/* ==========================================================================
   1. NAVIGATION & MOBILE MENU
   ========================================================================== */
function initNavigation() {
  const header = document.getElementById('site-header');
  const toggleBtn = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  // Header background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      toggleBtn.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    // Close mobile menu on clicking any link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggleBtn.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }
}

/* ==========================================================================
   2. SERVICES POPUP MODAL (Auto 5-Photo Slideshow, Name, Desc, Order, Wishlist)
   ========================================================================== */
let activeSlideIndex = 0;
let slideInterval = null;
let currentActiveService = null;

function initServicesModal() {
  const modal = document.getElementById('service-modal');
  const closeBtn = document.getElementById('service-modal-close');
  const backBtn = document.getElementById('service-modal-back');
  const orderBtn = document.getElementById('service-modal-order');
  const wishlistBtn = document.getElementById('service-modal-wishlist');

  // Next / Prev slide buttons
  const prevSlideBtn = document.getElementById('slide-prev-btn');
  const nextSlideBtn = document.getElementById('slide-next-btn');

  // Service grid buttons / cards click handler
  const serviceCards = document.querySelectorAll('.service-item-card');
  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      const serviceId = card.dataset.serviceId;
      openServiceModal(serviceId);
    });
  });

  // Close handlers
  if (closeBtn) closeBtn.addEventListener('click', closeServiceModal);
  if (backBtn) backBtn.addEventListener('click', closeServiceModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeServiceModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeServiceModal();
    }
  });

  // Slideshow manual controls
  if (prevSlideBtn) {
    prevSlideBtn.addEventListener('click', () => {
      changeSlide(-1);
      resetAutoSlide();
    });
  }

  if (nextSlideBtn) {
    nextSlideBtn.addEventListener('click', () => {
      changeSlide(1);
      resetAutoSlide();
    });
  }

  // Place Order Now button handler
  if (orderBtn) {
    orderBtn.addEventListener('click', () => {
      if (!currentActiveService) return;
      closeServiceModal();

      // Prefill WhatsApp direct message with friendly text and open chat
      const msg = encodeURIComponent(`Hello CREATIVIZR, I would like to place an order for: ${currentActiveService.name}. Please share pricing and next steps.`);
      const whatsappUrl = `https://wa.me/message/SRJOUG6J4NDEJ1?text=${msg}`;
      window.open(whatsappUrl, '_blank');

      // Also scroll to contact form and prefill field
      const contactSection = document.getElementById('contact');
      const contactServiceInput = document.getElementById('contact-service');
      const contactMessageInput = document.getElementById('contact-message');

      if (contactServiceInput) contactServiceInput.value = currentActiveService.name;
      if (contactMessageInput) {
        contactMessageInput.value = `Hello CREATIVIZR! I am interested in ordering your ${currentActiveService.name} service. Here are my project requirements:\n- \n- `;
      }

      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }

      showToast(`Selected "${currentActiveService.name}" for your order inquiry!`);
    });
  }

  // Wishlist / Add to Cart button handler
  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', () => {
      if (!currentActiveService) return;
      toggleWishlistItem(currentActiveService);
      updateModalWishlistBtn();
      updateWishlistUI();
    });
  }

  // Slideshow hover pause
  const slideStage = document.getElementById('service-slideshow-stage');
  if (slideStage) {
    slideStage.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slideStage.addEventListener('mouseleave', () => startAutoSlide());
  }
}

function openServiceModal(serviceId) {
  const service = SERVICES_DATA.find(s => s.id === serviceId);
  if (!service) return;

  currentActiveService = service;
  activeSlideIndex = 0;

  // Populate Details
  const titleEl = document.getElementById('service-modal-title');
  const catEl = document.getElementById('service-modal-category');
  const descEl = document.getElementById('service-modal-desc');
  const deliverablesEl = document.getElementById('service-modal-deliverables');

  if (titleEl) titleEl.textContent = service.name;
  if (catEl) catEl.textContent = service.category;
  if (descEl) descEl.textContent = service.fullDesc;

  // Deliverables list
  if (deliverablesEl) {
    deliverablesEl.innerHTML = service.deliverables.map(d => `
      <li class="deliverable-item">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#22c55e" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        <span>${d}</span>
      </li>
    `).join('');
  }

  // Render Slideshow
  renderSlideshow(service.slides);

  // Update Wishlist button label
  updateModalWishlistBtn();

  // Show Modal
  const modal = document.getElementById('service-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Start Auto Slide
  startAutoSlide();
}

function closeServiceModal() {
  const modal = document.getElementById('service-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  clearInterval(slideInterval);
}

function renderSlideshow(slides) {
  const track = document.getElementById('slideshow-track');
  const dotsContainer = document.getElementById('slideshow-dots');
  const counterEl = document.getElementById('slideshow-counter');
  const captionEl = document.getElementById('slideshow-caption');

  if (!track) return;

  // Render Images
  track.innerHTML = slides.map((s, idx) => `
    <div class="modal-slide ${idx === 0 ? 'active' : ''}">
      <img src="${s.url}" alt="${s.title}" loading="lazy">
    </div>
  `).join('');

  // Render 5 Dots
  if (dotsContainer) {
    dotsContainer.innerHTML = slides.map((_, idx) => `
      <button class="slide-dot ${idx === 0 ? 'active' : ''}" data-index="${idx}" aria-label="Slide ${idx + 1}"></button>
    `).join('');

    dotsContainer.querySelectorAll('.slide-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        activeSlideIndex = parseInt(dot.dataset.index, 10);
        updateActiveSlide();
        resetAutoSlide();
      });
    });
  }

  updateSlideMeta();
}

function updateActiveSlide() {
  const slides = document.querySelectorAll('#slideshow-track .modal-slide');
  const dots = document.querySelectorAll('#slideshow-dots .slide-dot');

  slides.forEach((s, idx) => s.classList.toggle('active', idx === activeSlideIndex));
  dots.forEach((d, idx) => d.classList.toggle('active', idx === activeSlideIndex));

  updateSlideMeta();
}

function updateSlideMeta() {
  if (!currentActiveService) return;
  const currentSlide = currentActiveService.slides[activeSlideIndex];
  const counterEl = document.getElementById('slideshow-counter');
  const captionEl = document.getElementById('slideshow-caption');

  if (counterEl) {
    counterEl.textContent = `Photo ${activeSlideIndex + 1} of ${currentActiveService.slides.length}`;
  }
  if (captionEl && currentSlide) {
    captionEl.innerHTML = `<strong>${currentSlide.title}</strong> — ${currentSlide.caption}`;
  }
}

function changeSlide(direction) {
  if (!currentActiveService) return;
  const total = currentActiveService.slides.length;
  activeSlideIndex = (activeSlideIndex + direction + total) % total;
  updateActiveSlide();
}

function startAutoSlide() {
  clearInterval(slideInterval);
  slideInterval = setInterval(() => {
    changeSlide(1);
  }, 3500);
}

function resetAutoSlide() {
  clearInterval(slideInterval);
  startAutoSlide();
}

function updateModalWishlistBtn() {
  const btn = document.getElementById('service-modal-wishlist');
  if (!btn || !currentActiveService) return;

  const isInWishlist = getWishlist().some(item => item.id === currentActiveService.id);
  if (isInWishlist) {
    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#ef4444" stroke="#ef4444" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      <span>In Wishlist (Tap to Remove)</span>
    `;
    btn.classList.add('in-cart');
  } else {
    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      <span>Add to Wishlist / Cart</span>
    `;
    btn.classList.remove('in-cart');
  }
}

/* ==========================================================================
   SERVICES CARD HOVER SLIDESHOW (Auto 5-photo slideshow on 1s delay)
   ========================================================================== */
function initCardHoverSlideshow() {
  const cards = document.querySelectorAll('.service-item-card');

  cards.forEach(card => {
    const serviceId = card.dataset.serviceId;
    const service = SERVICES_DATA.find(s => s.id === serviceId);
    if (!service || !service.slides || service.slides.length === 0) return;

    // Preload slides for ultra-smooth instantaneous switching
    service.slides.forEach(slide => {
      const preloadImg = new Image();
      preloadImg.src = slide.url;
    });

    const imgEl = card.querySelector('.service-card-media img');
    const dots = card.querySelectorAll('.card-slide-dot');
    let slideIndex = 0;
    let hoverTimer = null;

    card.addEventListener('mouseenter', () => {
      slideIndex = 0;
      clearInterval(hoverTimer);

      hoverTimer = setInterval(() => {
        slideIndex = (slideIndex + 1) % service.slides.length;
        if (imgEl) {
          imgEl.style.opacity = '0.75';
          setTimeout(() => {
            imgEl.src = service.slides[slideIndex].url;
            imgEl.style.opacity = '1';
          }, 70);
        }
        dots.forEach((dot, idx) => dot.classList.toggle('active', idx === slideIndex));
      }, 1000); // 1s delay
    });

    card.addEventListener('mouseleave', () => {
      clearInterval(hoverTimer);
      slideIndex = 0;
      if (imgEl) {
        imgEl.style.opacity = '0.75';
        setTimeout(() => {
          imgEl.src = service.coverPhoto || service.slides[0].url;
          imgEl.style.opacity = '1';
        }, 70);
      }
      dots.forEach((dot, idx) => dot.classList.toggle('active', idx === 0));
    });
  });
}

/* ==========================================================================
   3. WISHLIST / CART SYSTEM
   ========================================================================== */
function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem('creativizr_wishlist') || '[]');
  } catch (e) {
    return [];
  }
}

function saveWishlist(list) {
  try {
    localStorage.setItem('creativizr_wishlist', JSON.stringify(list));
  } catch (e) {}
  updateWishlistUI();
}

function toggleWishlistItem(service) {
  let list = getWishlist();
  const existingIndex = list.findIndex(item => item.id === service.id);

  if (existingIndex > -1) {
    list.splice(existingIndex, 1);
    saveWishlist(list);
    showToast(`Removed "${service.name}" from your Wishlist.`);
  } else {
    list.push({
      id: service.id,
      name: service.name,
      category: service.category,
      coverPhoto: service.coverPhoto
    });
    saveWishlist(list);
    showToast(`Added "${service.name}" to your Wishlist!`);
  }
}

function initWishlistSystem() {
  const triggerBtn = document.getElementById('header-wishlist-btn');
  const drawer = document.getElementById('wishlist-drawer');
  const closeBtn = document.getElementById('wishlist-drawer-close');
  const clearBtn = document.getElementById('wishlist-clear-btn');
  const orderWhatsAppBtn = document.getElementById('wishlist-order-whatsapp');

  // Service Card wishlist buttons handler
  document.querySelectorAll('.card-wishlist-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent card click opening the details modal
      const serviceId = btn.dataset.serviceId;
      const service = SERVICES_DATA.find(s => s.id === serviceId);
      if (!service) return;
      toggleWishlistItem(service);
      if (currentActiveService && currentActiveService.id === service.id) {
        updateModalWishlistBtn();
      }
    });
  });

  if (triggerBtn && drawer) {
    triggerBtn.addEventListener('click', () => {
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
      renderWishlistDrawerItems();
    });
  }

  if (closeBtn && drawer) {
    closeBtn.addEventListener('click', () => {
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  if (drawer) {
    drawer.addEventListener('click', (e) => {
      if (e.target === drawer) {
        drawer.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      saveWishlist([]);
      renderWishlistDrawerItems();
      showToast('Wishlist cleared.');
    });
  }

  if (orderWhatsAppBtn) {
    orderWhatsAppBtn.addEventListener('click', () => {
      const list = getWishlist();
      if (list.length === 0) {
        showToast('Your wishlist is empty. Add services first!');
        return;
      }
      const names = list.map(item => `• ${item.name}`).join('%0A');
      const text = `Hello CREATIVIZR! I am ready to order the following design services:%0A%0A${names}%0A%0APlease let me know the bundle package and turnaround!`;
      window.open(`https://wa.me/message/SRJOUG6J4NDEJ1?text=${text}`, '_blank');
    });
  }

  updateWishlistUI();
}

function updateWishlistUI() {
  const list = getWishlist();
  const countBadges = document.querySelectorAll('.wishlist-counter-badge');
  countBadges.forEach(badge => {
    badge.textContent = list.length;
    badge.style.display = list.length > 0 ? 'inline-flex' : 'none';
  });

  // Sync all card wishlist buttons
  document.querySelectorAll('.card-wishlist-btn').forEach(btn => {
    const id = btn.dataset.serviceId;
    const inWishlist = list.some(item => item.id === id);
    btn.classList.toggle('in-wishlist', inWishlist);
    btn.title = inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist';
  });
}

function renderWishlistDrawerItems() {
  const list = getWishlist();
  const container = document.getElementById('wishlist-items-list');
  const emptyMsg = document.getElementById('wishlist-empty-msg');
  const footerEl = document.getElementById('wishlist-drawer-footer');

  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = '';
    if (emptyMsg) emptyMsg.style.display = 'block';
    if (footerEl) footerEl.style.display = 'none';
  } else {
    if (emptyMsg) emptyMsg.style.display = 'none';
    if (footerEl) footerEl.style.display = 'block';

    container.innerHTML = list.map(item => `
      <div class="wishlist-row-item">
        <img src="${item.coverPhoto}" alt="${item.name}" class="wishlist-thumb">
        <div class="wishlist-info">
          <span class="wishlist-cat">${item.category}</span>
          <h4 class="wishlist-title">${item.name}</h4>
        </div>
        <button class="wishlist-remove-btn" data-id="${item.id}" title="Remove item">
          ✕
        </button>
      </div>
    `).join('');

    container.querySelectorAll('.wishlist-remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        let current = getWishlist().filter(i => i.id !== id);
        saveWishlist(current);
        renderWishlistDrawerItems();
        updateModalWishlistBtn();
      });
    });
  }
}

/* ==========================================================================
   4. RECENT WORK AUTO SLIDESHOW & INTERACTIVE SCROLLING ANIMATION
   ========================================================================== */
function initRecentWorkShowcase() {
  const sliderTrack = document.getElementById('recent-work-track');
  const prevBtn = document.getElementById('recent-prev-btn');
  const nextBtn = document.getElementById('recent-next-btn');
  const dotsContainer = document.getElementById('recent-work-dots');
  const progressBar = document.getElementById('recent-work-progress');

  if (!sliderTrack) return;

  let currentIndex = 0;
  const total = RECENT_WORK_DATA.length;
  let workInterval = null;
  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;

  // Render recent work slides
  sliderTrack.innerHTML = RECENT_WORK_DATA.map((work, idx) => `
    <div class="recent-work-slide ${idx === 0 ? 'active' : ''}" data-index="${idx}">
      <div class="recent-work-image-wrap">
        <img src="${work.image}" alt="${work.title}" loading="lazy">
        <span class="recent-work-year">${work.year}</span>
      </div>
      <div class="recent-work-details">
        <span class="recent-work-category">${work.category}</span>
        <h3 class="recent-work-title">${work.title}</h3>
        <p class="recent-work-desc">${work.desc}</p>
      </div>
    </div>
  `).join('');

  // Render pagination dots
  if (dotsContainer) {
    dotsContainer.innerHTML = RECENT_WORK_DATA.map((_, idx) => `
      <button class="recent-dot ${idx === 0 ? 'active' : ''}" data-index="${idx}" aria-label="Go to project ${idx + 1}"></button>
    `).join('');

    dotsContainer.querySelectorAll('.recent-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        goToSlide(parseInt(dot.dataset.index, 10));
        resetWorkTimer();
      });
    });
  }

  function goToSlide(index) {
    currentIndex = (index + total) % total;
    const slides = sliderTrack.querySelectorAll('.recent-work-slide');
    const dots = dotsContainer ? dotsContainer.querySelectorAll('.recent-dot') : [];

    slides.forEach((s, idx) => s.classList.toggle('active', idx === currentIndex));
    dots.forEach((d, idx) => d.classList.toggle('active', idx === currentIndex));

    // Smooth scroll position
    const activeSlide = slides[currentIndex];
    if (activeSlide) {
      sliderTrack.scrollTo({
        left: activeSlide.offsetLeft - sliderTrack.offsetLeft,
        behavior: 'smooth'
      });
    }

    animateProgress();
  }

  function animateProgress() {
    if (!progressBar) return;
    progressBar.style.transition = 'none';
    progressBar.style.width = '0%';
    setTimeout(() => {
      progressBar.style.transition = 'width 4.5s linear';
      progressBar.style.width = '100%';
    }, 20);
  }

  function startWorkTimer() {
    clearInterval(workInterval);
    animateProgress();
    workInterval = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 4500);
  }

  function resetWorkTimer() {
    clearInterval(workInterval);
    startWorkTimer();
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
      resetWorkTimer();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
      resetWorkTimer();
    });
  }

  // Interactive mouse drag-to-scroll & momentum
  sliderTrack.addEventListener('mousedown', (e) => {
    isDragging = true;
    sliderTrack.classList.add('dragging');
    startX = e.pageX - sliderTrack.offsetLeft;
    scrollLeft = sliderTrack.scrollLeft;
    clearInterval(workInterval);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderTrack.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderTrack.scrollLeft = scrollLeft - walk;
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      sliderTrack.classList.remove('dragging');
      // Snap to closest slide
      snapToClosest();
      startWorkTimer();
    }
  });

  // Touch Support
  sliderTrack.addEventListener('touchstart', (e) => {
    clearInterval(workInterval);
  }, { passive: true });

  sliderTrack.addEventListener('touchend', () => {
    snapToClosest();
    startWorkTimer();
  });

  function snapToClosest() {
    const slides = sliderTrack.querySelectorAll('.recent-work-slide');
    let closestIndex = 0;
    let minDistance = Infinity;

    slides.forEach((s, idx) => {
      const dist = Math.abs(s.offsetLeft - sliderTrack.scrollLeft);
      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = idx;
      }
    });

    goToSlide(closestIndex);
  }

  // Hover to pause
  sliderTrack.addEventListener('mouseenter', () => clearInterval(workInterval));
  sliderTrack.addEventListener('mouseleave', () => startWorkTimer());

  startWorkTimer();
}

/* ==========================================================================
   5. CONTACT FORM & DIRECT LINKS
   ========================================================================== */
function initContactSystem() {
  const form = document.getElementById('creativizr-contact-form');
  const submitBtn = document.getElementById('contact-submit-btn');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const serviceEl = document.getElementById('contact-service');
      const serviceVal = serviceEl ? serviceEl.value : 'General Inquiry';
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill in your name, email, and project details.');
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <span>Sending to creativizrdesigns@gmail.com...</span>
          <svg class="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10" stroke-opacity="0.3"></circle><path d="M12 2a10 10 0 0 1 10 10"></path></svg>
        `;
      }

      // Send to creativizrdesigns@gmail.com via FormSubmit AJAX API
      fetch('https://formsubmit.co/ajax/creativizrdesigns@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          service: serviceVal,
          message: message,
          _subject: `New Design Project Inquiry from ${name} - CREATIVIZR`
        })
      })
      .then(res => res.json())
      .then(() => {
        showToast(`Thank you, ${name}! Your email has been delivered to creativizrdesigns@gmail.com.`);
        form.reset();

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `
            <span>Message Sent Successfully!</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          `;
          setTimeout(() => {
            submitBtn.innerHTML = `
              <span>Send Message</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            `;
          }, 3500);
        }
      })
      .catch(() => {
        // Fallback: direct mailto client
        showToast(`Preparing email to creativizrdesigns@gmail.com...`);
        const mailtoUrl = `mailto:creativizrdesigns@gmail.com?subject=${encodeURIComponent('CREATIVIZR Design Project Inquiry - ' + name)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\nService: ' + serviceVal + '\n\nMessage:\n' + message)}`;
        window.location.href = mailtoUrl;
        form.reset();

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `
            <span>Send Message</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          `;
        }
      });
    });
  }
}

/* ==========================================================================
   6. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'global-toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
