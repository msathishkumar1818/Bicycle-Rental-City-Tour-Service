function initPageLoader() {
  const dismiss = () => {
    const loader = document.getElementById("pageLoader") || document.getElementById("global-page-loader");
    if (loader && !loader.classList.contains("loaded")) {
      loader.classList.add("loader-hidden", "loaded");
      setTimeout(() => {
        if (loader && loader.parentNode) {
          loader.remove();
        }
      }, 300);
    }
    document.body.classList.remove("loading");
  };

  setTimeout(dismiss, 650);
  if (document.readyState === "complete") {
    setTimeout(dismiss, 100);
  }
}

// Start loader dismiss countdown immediately
initPageLoader();

document.addEventListener('DOMContentLoaded', () => {
  initBackToTop();
  initTheme();
  initDirection();
  initHomeDropdown();
  initMobileMenu();
  initActiveNavigation();
  initFleetExperience();
  initPickupLocations();
  initNumberCounters();
  initScrollReveal();
  initHome2Features();
  initFleetPageCatalog();
  initToursPage();
  initLocationsPage();
  initRulesPage();
  initLoginPage();
  initDashboardPage();
  initContactPage();
  initFaqAccordion();
});

/* -------------------------------------------------------------------------- */
/* 2. Floating Back to Top Button                                             */
/* -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top-btn');
  const dashScrollContainer = document.getElementById('dash-main-scroll-container');
  if (!backToTopBtn) return;

  if (dashScrollContainer) {
    dashScrollContainer.addEventListener('scroll', () => {
      if (dashScrollContainer.scrollTop > 320) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      dashScrollContainer.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  } else {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 320) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* -------------------------------------------------------------------------- */
/* 3. Theme Management (Dark Navy / Charcoal & Crisp White)                   */
/* -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggles = document.querySelectorAll('.theme-toggle-btn');
  const storedTheme = localStorage.getItem('velo_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const initialDark = storedTheme === 'dark' || (!storedTheme && prefersDark);
  setTheme(initialDark);

  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(!isDark);
    });
  });
}

function setTheme(dark) {
  const html = document.documentElement;
  const sunIcons = document.querySelectorAll('.theme-icon-sun');
  const moonIcons = document.querySelectorAll('.theme-icon-moon');
  const themeLabels = document.querySelectorAll('.theme-status-label');
  const themeButtons = document.querySelectorAll('.theme-toggle-btn');

  if (dark) {
    html.classList.add('dark');
    localStorage.setItem('velo_theme', 'dark');
    sunIcons.forEach(icon => icon.classList.remove('hidden'));
    moonIcons.forEach(icon => icon.classList.add('hidden'));
    themeLabels.forEach(lbl => lbl.textContent = 'Dark Mode');
    themeButtons.forEach(btn => {
      btn.classList.add('border-[#C8D62C]', 'text-[#C8D62C]');
      btn.setAttribute('title', 'Switch to Light Mode');
      btn.setAttribute('aria-label', 'Switch to Light Mode');
      btn.setAttribute('aria-pressed', 'true');
    });
  } else {
    html.classList.remove('dark');
    localStorage.setItem('velo_theme', 'light');
    sunIcons.forEach(icon => icon.classList.add('hidden'));
    moonIcons.forEach(icon => icon.classList.remove('hidden'));
    themeLabels.forEach(lbl => lbl.textContent = 'Light Mode');
    themeButtons.forEach(btn => {
      btn.classList.remove('border-[#C8D62C]', 'text-[#C8D62C]');
      btn.setAttribute('title', 'Switch to Dark Mode');
      btn.setAttribute('aria-label', 'Switch to Dark Mode');
      btn.setAttribute('aria-pressed', 'false');
    });
  }
}

/* -------------------------------------------------------------------------- */
/* 4. Direction Management (LTR / RTL)                                        */
/* -------------------------------------------------------------------------- */
function initDirection() {
  const dirToggles = document.querySelectorAll('.dir-toggle-btn');
  const storedDir = localStorage.getItem('velo_direction') || 'ltr';
  setDirection(storedDir);

  dirToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
      const nextDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
      setDirection(nextDir);
    });
  });
}

function setDirection(dir) {
  const html = document.documentElement;
  const labels = document.querySelectorAll('.dir-toggle-label');
  const dirButtons = document.querySelectorAll('.dir-toggle-btn');
  
  html.setAttribute('dir', dir);
  localStorage.setItem('velo_direction', dir);
  labels.forEach(l => l.textContent = dir.toUpperCase());

  dirButtons.forEach(btn => {
    if (dir === 'rtl') {
      btn.classList.add('border-[#C8D62C]', 'text-[#28552E]', 'dark:text-[#C8D62C]', 'bg-[#C8D62C]/10');
      btn.setAttribute('title', 'Switch to LTR Direction');
      btn.setAttribute('aria-label', 'Switch to LTR Direction');
      btn.setAttribute('aria-pressed', 'true');
    } else {
      btn.classList.remove('border-[#C8D62C]', 'text-[#28552E]', 'dark:text-[#C8D62C]', 'bg-[#C8D62C]/10');
      btn.setAttribute('title', 'Switch to RTL Direction');
      btn.setAttribute('aria-label', 'Switch to RTL Direction');
      btn.setAttribute('aria-pressed', 'false');
    }
  });
}

/* -------------------------------------------------------------------------- */
/* 5. Desktop & Mobile Home Dropdown System                                   */
/* -------------------------------------------------------------------------- */
function initHomeDropdown() {
  const dropdownContainers = document.querySelectorAll('.home-dropdown-container');
  const mobileHomeToggle = document.getElementById('mobile-home-accordion-btn');
  const mobileHomeMenu = document.getElementById('mobile-home-accordion-menu');

  dropdownContainers.forEach(container => {
    const trigger = container.querySelector('.home-dropdown-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = container.classList.contains('open');
      dropdownContainers.forEach(c => c.classList.remove('open'));
      if (!isOpen) container.classList.add('open');
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.home-dropdown-container')) {
      dropdownContainers.forEach(c => c.classList.remove('open'));
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdownContainers.forEach(c => c.classList.remove('open'));
    }
  });

  if (mobileHomeToggle && mobileHomeMenu) {
    mobileHomeToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const isExpanded = mobileHomeToggle.getAttribute('aria-expanded') === 'true';
      mobileHomeToggle.setAttribute('aria-expanded', !isExpanded);
      mobileHomeMenu.classList.toggle('hidden', isExpanded);
      const icon = mobileHomeToggle.querySelector('.accordion-chevron');
      if (icon) icon.classList.toggle('rotate-180', !isExpanded);
    });
  }
}

/* -------------------------------------------------------------------------- */
/* 6. Active Navigation Detection                                             */
/* -------------------------------------------------------------------------- */
function initActiveNavigation() {
  const currentPath = window.location.pathname.toLowerCase();
  const isHome1 = currentPath.endsWith('index.html') || currentPath.endsWith('/') || currentPath === '';
  const isHome2 = currentPath.endsWith('home-2.html');
  const isFleet = currentPath.endsWith('fleet.html');
  const isTours = currentPath.endsWith('tours.html');
  const isLocations = currentPath.endsWith('locations.html');
  const isRules = currentPath.endsWith('rules.html');
  const isLogin = currentPath.endsWith('login.html');
  const isDashboard = currentPath.endsWith('dashboard.html');
  const isContact = currentPath.endsWith('contact.html');

  const desktopHomeTrigger = document.getElementById('desktop-home-nav-trigger');
  const dropHome1 = document.getElementById('dropdown-link-home1');
  const dropHome2 = document.getElementById('dropdown-link-home2');
  const desktopFleet = document.getElementById('desktop-nav-fleet');
  const desktopTours = document.getElementById('desktop-nav-tours');
  const desktopLocations = document.getElementById('desktop-nav-locations');
  const desktopRules = document.getElementById('desktop-nav-rules');
  const desktopDashboard = document.getElementById('desktop-nav-dashboard');
  const desktopContact = document.getElementById('desktop-nav-contact');
  const desktopActionLogin = document.getElementById('desktop-action-login');

  if (isHome1 && dropHome1) dropHome1.classList.add('active');
  if (isHome2 && dropHome2) dropHome2.classList.add('active');

  if ((isHome1 || isHome2) && desktopHomeTrigger) {
    desktopHomeTrigger.classList.add('text-[#C8D62C]', 'font-bold');
  }

  if (isFleet && desktopFleet) {
    desktopFleet.classList.add('text-[#C8D62C]', 'font-bold');
  }

  if (isTours && desktopTours) {
    desktopTours.classList.add('text-[#C8D62C]', 'font-bold');
  }

  if (isLocations && desktopLocations) {
    desktopLocations.classList.add('text-[#C8D62C]', 'font-bold');
  }

  if (isRules && desktopRules) {
    desktopRules.classList.add('text-[#C8D62C]', 'font-bold');
  }

  if (isDashboard && desktopDashboard) {
    desktopDashboard.classList.add('text-[#C8D62C]', 'font-bold');
  }

  if (isContact && desktopContact) {
    desktopContact.classList.add('text-[#C8D62C]', 'font-bold');
  }

  if (isLogin && desktopActionLogin) {
    desktopActionLogin.classList.add('ring-2', 'ring-[#C8D62C]');
  }
}

/* -------------------------------------------------------------------------- */
/* 7. Mobile Navigation Drawer                                                */
/* -------------------------------------------------------------------------- */
function initMobileMenu() {
  const openBtn = document.getElementById('mobile-menu-open-btn');
  const closeBtn = document.getElementById('mobile-menu-close-btn');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('mobile-drawer-backdrop');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!drawer || !backdrop) return;

  function isRtl() {
    return document.documentElement.getAttribute('dir') === 'rtl';
  }

  function openDrawer() {
    drawer.classList.remove('translate-x-full', '-translate-x-full', 'pointer-events-none');
    drawer.classList.add('translate-x-0', 'pointer-events-auto');
    backdrop.classList.remove('opacity-0', 'pointer-events-none');
    backdrop.classList.add('opacity-100', 'pointer-events-auto');
    
    // Strict scroll lock on viewport
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.classList.add('mobile-menu-open');
    
    if (openBtn) openBtn.setAttribute('aria-expanded', 'true');
  }

  function closeDrawer() {
    drawer.classList.remove('translate-x-0', 'pointer-events-auto');
    if (isRtl()) {
      drawer.classList.add('-translate-x-full', 'pointer-events-none');
    } else {
      drawer.classList.add('translate-x-full', 'pointer-events-none');
    }
    backdrop.classList.remove('opacity-100', 'pointer-events-auto');
    backdrop.classList.add('opacity-0', 'pointer-events-none');
    
    // Restore page scroll
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.body.classList.remove('mobile-menu-open');
    
    if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
  }

  if (openBtn) {
    openBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openDrawer();
    });
  }
  
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeDrawer();
    });
  }
  
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      e.preventDefault();
      closeDrawer();
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !drawer.classList.contains('pointer-events-none')) {
      closeDrawer();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024 && !drawer.classList.contains('pointer-events-none')) {
      closeDrawer();
    }
  });
}

/* -------------------------------------------------------------------------- */
/* 8. Home 1 Interactive Fleet Tab Switcher                                    */
/* -------------------------------------------------------------------------- */
const home1FleetModels = {
  city: {
    name: 'Velo City Cruiser Classic',
    tag: 'Urban Comfort & Everyday Commute',
    rate: '$18 / day',
    frame: 'Lightweight Hydroformed Alloy 6061',
    gears: '7-Speed Shimano Nexus Internal Hub',
    brakes: 'Shimano Roller Brakes (All-Weather)',
    weight: '12.4 kg (27.3 lbs)',
    desc: 'Engineered for smooth, upright city riding. Features puncture-resistant Continental Contact Plus tires, an integrated rear luggage rack, and zero-maintenance internal gearing.',
    image: 'assets/images/p1.jpg'
  },
  ebike: {
    name: 'Velo E-Commuter Pro 85Nm',
    tag: 'High-Torque Bosch Electric Power',
    rate: '$34 / day',
    frame: 'Reinforced Aircraft Aluminum with Internal Cable Routing',
    gears: 'Gates Carbon CDX Belt Drive (No grease, no rust)',
    brakes: 'Magura MT4 4-Piston Hydraulic Disc Brakes',
    weight: '18.8 kg (with 625Wh PowerTube battery)',
    desc: 'Effortless hills and long commutes with the 85Nm Bosch Performance Line CX motor. Delivers up to 90 km range on a single charge with smart digital LCD cockpit display.',
    image: 'assets/images/p2.jpg'
  },
  tandem: {
    name: 'Velo Duo Tandem Grand',
    tag: 'Synchronized Dual-Rider Exploration',
    rate: '$28 / day',
    frame: 'Custom Drawn Chromoly Steel Touring Frame',
    gears: '10-Speed Shimano Deore Wide-Range Transmission',
    brakes: 'Avid BB7 Mechanical Disc Brakes (203mm Rotors)',
    weight: '19.2 kg (Balanced double-rider geometry)',
    desc: 'Share the joy of cycling with a partner. Fitted with dual handcrafted Brooks England leather saddles, independent handlebar adjustments, and twin water bottle mounts.',
    image: 'assets/images/p3.jpg'
  }
};

function initFleetExperience() {
  const tabButtons = document.querySelectorAll('.fleet-tab-btn');
  const titleEl = document.getElementById('fleet-model-title');
  const tagEl = document.getElementById('fleet-model-tag');
  const rateEl = document.getElementById('fleet-model-rate');
  const frameEl = document.getElementById('fleet-spec-frame');
  const gearsEl = document.getElementById('fleet-spec-gears');
  const brakesEl = document.getElementById('fleet-spec-brakes');
  const weightEl = document.getElementById('fleet-spec-weight');
  const descEl = document.getElementById('fleet-model-desc');
  const imgEl = document.getElementById('fleet-model-img');

  if (!tabButtons.length) return;

  function switchFleetModel(modelKey) {
    const data = home1FleetModels[modelKey];
    if (!data) return;

    tabButtons.forEach(btn => {
      const isCurrent = btn.dataset.model === modelKey;
      btn.classList.toggle('active', isCurrent);
      btn.classList.toggle('bg-[#C8D62C]', isCurrent);
      btn.classList.toggle('text-[#171A18]', isCurrent);
      btn.classList.toggle('border-[#C8D62C]', isCurrent);
      btn.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
    });

    if (imgEl) {
      imgEl.style.opacity = '0.3';
      setTimeout(() => {
        imgEl.src = data.image;
        imgEl.alt = data.name;
        imgEl.style.opacity = '1';
      }, 150);
    }

    if (titleEl) titleEl.textContent = data.name;
    if (tagEl) tagEl.textContent = data.tag;
    if (rateEl) rateEl.textContent = data.rate;
    if (frameEl) frameEl.textContent = data.frame;
    if (gearsEl) gearsEl.textContent = data.gears;
    if (brakesEl) brakesEl.textContent = data.brakes;
    if (weightEl) weightEl.textContent = data.weight;
    if (descEl) descEl.textContent = data.desc;
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      switchFleetModel(btn.dataset.model);
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 9. Pickup Locations Map Hotspots (Home 1)                                  */
/* -------------------------------------------------------------------------- */
const stationLocations = {
  central: {
    name: 'Central Railway Station Hub',
    address: 'Bahnhofplatz 1, Sector A (Track 18 Exit)',
    bikes: '42 Bikes Available',
    docks: '18 Empty Docks',
    hours: 'Open 24/7 (Keyless Unlock & Attendant 07:00-22:00)',
    transit: 'Direct access to S-Bahn, Intercity Trains, and Metro Lines 1, 2, 4'
  },
  oldtown: {
    name: 'Historic Old Town Plaza Hub',
    address: 'Münsterhof 8, Old City Square',
    bikes: '18 Bikes Available',
    docks: '12 Empty Docks',
    hours: 'Open 06:00 – 00:00 Daily',
    transit: '2 min walk from Historic Cathedral & Riverboat Pier'
  },
  waterfront: {
    name: 'Waterfront Promenade Hub',
    address: 'Seestrasse 44, Marina Pier 3',
    bikes: '29 Bikes Available',
    docks: '15 Empty Docks',
    hours: 'Open 24/7 (Solar Powered Smart Dock)',
    transit: 'Direct connection to Scenic River Bicycle Trail'
  }
};

function initPickupLocations() {
  const hotspots = document.querySelectorAll('.map-hotspot');
  const titleEl = document.getElementById('station-info-title');
  const addressEl = document.getElementById('station-info-address');
  const bikesEl = document.getElementById('station-info-bikes');
  const docksEl = document.getElementById('station-info-docks');
  const hoursEl = document.getElementById('station-info-hours');
  const transitEl = document.getElementById('station-info-transit');

  if (!hotspots.length) return;

  function updateStationDisplay(key) {
    const data = stationLocations[key];
    if (!data) return;

    hotspots.forEach(h => {
      const isSelected = h.dataset.station === key;
      h.classList.toggle('ring-4', isSelected);
      h.classList.toggle('ring-sky-400', isSelected);
    });

    if (titleEl) titleEl.textContent = data.name;
    if (addressEl) addressEl.textContent = data.address;
    if (bikesEl) bikesEl.textContent = data.bikes;
    if (docksEl) docksEl.textContent = data.docks;
    if (hoursEl) hoursEl.textContent = data.hours;
    if (transitEl) transitEl.textContent = data.transit;
  }

  hotspots.forEach(hotspot => {
    hotspot.addEventListener('click', () => {
      updateStationDisplay(hotspot.dataset.station);
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 10. Number Counter Animation                                               */
/* -------------------------------------------------------------------------- */
function initNumberCounters() {
  const counterElements = document.querySelectorAll('.stat-counter');
  if (!counterElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetNum = parseInt(el.dataset.target, 10);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const duration = 1600;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeOutQuad = 1 - (1 - progress) * (1 - progress);
          const currentVal = Math.floor(easeOutQuad * targetNum);

          el.textContent = `${prefix}${currentVal.toLocaleString()}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = `${prefix}${targetNum.toLocaleString()}${suffix}`;
          }
        }

        requestAnimationFrame(updateCounter);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  counterElements.forEach(el => observer.observe(el));
}

/* -------------------------------------------------------------------------- */
/* 11. Scroll Reveal Animations                                               */
/* -------------------------------------------------------------------------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal-on-scroll');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  reveals.forEach(el => observer.observe(el));
}

/* -------------------------------------------------------------------------- */
/* 12. Home 2 Features (Trails, Benchmarks, Station Filters)                  */
/* -------------------------------------------------------------------------- */
const home2TrailsData = {
  river: {
    name: 'Sunset River Promenade',
    location: 'Downtown → Riverside → Western Marina',
    distance: '18.2 km',
    time: '55 Minutes',
    elevation: '+20m',
    surface: 'Paved',
    level: 'EASY',
    besttime: 'Evening Hours',
    bike: 'City Cruiser',
    stops: 'Six Stops',
    start: 'Central Riverside Hub',
    riders: '42',
    desc: 'Glide alongside the riverbanks under illuminated willow trees. This protected cycling corridor connects the city centre with the western beach marina, making it ideal for relaxed evening rides, casual exploration and scenic commuting.',
    image: 'assets/images/locations-marina-hub.jpg'
  },
  cathedral: {
    name: 'Historic Cathedral Loop',
    location: 'Old Town → Cathedral Square → Heritage Quarter',
    distance: '12.5 km',
    time: '42 Minutes',
    elevation: '+65m',
    surface: 'Mixed',
    level: 'EASY',
    besttime: 'Morning & Afternoon',
    bike: 'City Cruiser',
    stops: 'Eight Stops',
    start: 'Old Town Mobility Hub',
    riders: '31',
    desc: 'A slower urban loop through the city\'s oldest streets, historic plazas and restored architecture. The route combines dedicated bike lanes with quiet heritage roads and several convenient photo and café stops.',
    image: 'assets/images/locations-oldtown-hub.jpg'
  },
  skyline: {
    name: 'Panoramic Skyline Climb',
    location: 'Central Station → Hill District → Skyline Viewpoint',
    distance: '15.8 km',
    time: '68 Minutes',
    elevation: '+240m',
    surface: 'Paved',
    level: 'MODERATE',
    besttime: 'Morning (Clear View)',
    bike: 'E-Bike 85Nm',
    stops: 'Five Stops',
    start: 'Central Station Hub',
    riders: '27',
    desc: 'Effortlessly conquer the hilltop ridge with our 85Nm Bosch e-bikes. Delivers breathtaking 360-degree views of the cityscape and Alpine peaks.',
    image: 'assets/images/tours-alpine-skyline.jpg'
  }
};

function initHome2Features() {
  const trailBtns = document.querySelectorAll('.trail-select-btn');
  const trailTitle = document.getElementById('trail-disp-name');
  const trailLocation = document.getElementById('trail-disp-location');
  const trailDist = document.getElementById('trail-disp-dist');
  const trailTime = document.getElementById('trail-disp-time');
  const trailElev = document.getElementById('trail-disp-elev');
  const trailSurf = document.getElementById('trail-disp-surface');
  const trailLevel = document.getElementById('trail-disp-level');
  const trailBestTime = document.getElementById('trail-disp-besttime');
  const trailBike = document.getElementById('trail-disp-bike');
  const trailStops = document.getElementById('trail-disp-stops');
  const trailStart = document.getElementById('trail-disp-start');
  const trailRiders = document.getElementById('trail-disp-riders');
  const trailDesc = document.getElementById('trail-disp-desc');
  const trailImg = document.getElementById('trail-disp-img');

  if (!trailBtns.length) return;

  function switchTrail(key) {
    const data = home2TrailsData[key];
    if (!data) return;

    trailBtns.forEach(btn => {
      const active = btn.dataset.trail === key;
      btn.classList.toggle('active', active);
      if (active) {
        btn.classList.add('bg-[#C8D62C]', 'border-[#C8D62C]', 'text-[#171A18]');
        btn.classList.remove('border-[#D9DDD8]', 'dark:border-white/10');
      } else {
        btn.classList.remove('bg-[#C8D62C]', 'border-[#C8D62C]', 'text-[#171A18]');
        btn.classList.add('border-[#D9DDD8]', 'dark:border-white/10');
      }
    });

    if (trailImg) {
      trailImg.style.opacity = '0.3';
      setTimeout(() => {
        trailImg.src = data.image;
        trailImg.alt = data.name;
        trailImg.style.opacity = '1';
      }, 150);
    }

    if (trailTitle) trailTitle.textContent = data.name;
    if (trailLocation) trailLocation.textContent = data.location;
    if (trailDist) trailDist.textContent = data.distance;
    if (trailTime) trailTime.textContent = data.time;
    if (trailElev) trailElev.textContent = data.elevation;
    if (trailSurf) trailSurf.textContent = data.surface;
    if (trailLevel) trailLevel.textContent = data.level;
    if (trailBestTime) trailBestTime.textContent = data.besttime;
    if (trailBike) trailBike.textContent = data.bike;
    if (trailStops) trailStops.textContent = data.stops;
    if (trailStart) trailStart.textContent = data.start;
    if (trailRiders) trailRiders.textContent = data.riders;
    if (trailDesc) trailDesc.textContent = data.desc;
  }

  trailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      switchTrail(btn.dataset.trail);
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 13. Phase 3: Fleet Master Catalog (Guarantees 4 Distinct Cards Per Filter)  */
/* -------------------------------------------------------------------------- */
const fleetCatalogData = [
  // --- Category: City Commuters (4 distinct models) ---
  {
    id: 'city-classic',
    name: 'Velo City Cruiser Classic',
    category: 'city',
    categoryName: 'City Commuter',
    price: 18,
    rating: '4.9 (420)',
    range: 'Unlimited',
    weight: '12.2 kg',
    gears: '7-Speed Shimano Altus',
    heights: ['s', 'm', 'l'],
    badge: 'Urban Classic',
    desc: 'Lightweight hydroformed alloy frame with upright geometry, puncture-resistant Continental tires, and integrated Shimano 7-speed shifting.',
    image: 'assets/images/fleet-city-stepthru.jpg'
  },
  {
    id: 'city-stepthru',
    name: 'Velo City Step-Through Comfort',
    category: 'city',
    categoryName: 'City Step-Through',
    price: 18,
    rating: '4.8 (310)',
    range: 'Unlimited',
    weight: '12.8 kg',
    gears: '7-Speed Nexus + Front Basket',
    heights: ['s', 'm'],
    badge: 'Step-Through',
    desc: 'Low step-through frame designed for effortless mounting with heavy-duty front porteur basket and plush suspension saddle.',
    image: 'assets/images/p15.jpg'
  },
  {
    id: 'city-dutch',
    name: 'Velo Amsterdam Dutch Heritage',
    category: 'city',
    categoryName: 'City Heritage',
    price: 20,
    rating: '4.9 (280)',
    range: 'Unlimited',
    weight: '13.5 kg',
    gears: '8-Speed Nexus + Enclosed Chaincase',
    heights: ['m', 'l'],
    badge: 'Classic Dutch',
    desc: 'Timeless Dutch-style roadster with fully enclosed chaincase, skirt guards, dynamo LED lights, and genuine Brooks leather saddle.',
    image: 'assets/images/fleet-city-cruiser-7s.jpg'
  },
  {
    id: 'city-belt',
    name: 'Velo Urban Belt-Drive Light',
    category: 'city',
    categoryName: 'Urban Lightweight',
    price: 22,
    rating: '5.0 (190)',
    range: 'Unlimited',
    weight: '10.9 kg',
    gears: 'Gates Carbon Belt + Shimano Alfine 8',
    heights: ['s', 'm', 'l'],
    badge: 'Zero Maintenance',
    desc: 'Superlight minimalist commuter with clean grease-free Gates carbon belt drive and hydraulic disc brakes for whisper-quiet speed.',
    image: 'assets/images/fleet-city-nexus-belt.jpg'
  },

  // --- Category: Electric E-Bikes (4 distinct models) ---
  {
    id: 'ebike-pro',
    name: 'Velo E-Commuter Pro 85Nm',
    category: 'ebike',
    categoryName: 'Electric E-Bike',
    price: 34,
    rating: '5.0 (580)',
    range: 'Up to 90 km',
    weight: '18.8 kg',
    gears: 'Gates Carbon Belt + Bosch 85Nm',
    heights: ['s', 'm', 'l'],
    badge: 'Best Seller 85Nm',
    desc: 'Bosch Performance Line 85Nm motor, integrated 625Wh battery, grease-free carbon belt drive, and Magura 4-piston hydraulic disc brakes.',
    image: 'assets/images/fleet-ebike-commuter-pro.jpg'
  },
  {
    id: 'ebike-touring',
    name: 'Velo E-Touring Explorer 120km',
    category: 'ebike',
    categoryName: 'Long-Range E-Bike',
    price: 42,
    rating: '4.9 (240)',
    range: 'Up to 120 km (Dual 1000Wh)',
    weight: '21.2 kg',
    gears: '11-Speed Deore XT + Air Fork',
    heights: ['m', 'l'],
    badge: 'Max Range 120km',
    desc: 'Engineered for grand day tours and rolling countryside. Dual battery pack, front air suspension fork, and supernova high-lumen lighting.',
    image: 'assets/images/fleet-ebike-touring-allroad.jpg'
  },
  {
    id: 'ebike-stepthrough',
    name: 'Velo E-Step-Through Low-Step',
    category: 'ebike',
    categoryName: 'Low-Step Electric',
    price: 32,
    rating: '4.8 (215)',
    range: 'Up to 80 km (500Wh)',
    weight: '19.4 kg',
    gears: 'Shimano Nexus 8E E-Bike Hub',
    heights: ['s', 'm'],
    badge: 'Low Step E-Bike',
    desc: 'Accessible low-step frame with smooth Bosch Active Line Plus motor, plush gel saddle, and ergonomic swept-back handlebars.',
    image: 'assets/images/fleet-ebike-urban-boost.jpg'
  },
  {
    id: 'ebike-speed',
    name: 'Velo Speed-Pedelec 45km/h',
    category: 'ebike',
    categoryName: 'Speed Pedelec (S-Class)',
    price: 48,
    rating: '5.0 (150)',
    range: 'Up to 100 km',
    weight: '22.0 kg',
    gears: 'Pinion 12-Speed + 45km/h Motor',
    heights: ['m', 'l'],
    badge: '45 km/h Speed',
    desc: 'High-speed commuter engineered for long intercity transit. Heavy-duty aluminum chassis, integrated brake lights, and radar sensor.',
    image: 'assets/images/fleet-ebike-cargo-family.jpg'
  },

  // --- Category: Tandem & Duo (4 distinct models) ---
  {
    id: 'tandem-grand',
    name: 'Velo Duo Tandem Grand',
    category: 'tandem',
    categoryName: 'Tandem Touring',
    price: 28,
    rating: '4.9 (180)',
    range: 'Unlimited (2 Riders)',
    weight: '19.2 kg',
    gears: '10-Speed Wide Range + Brooks',
    heights: ['m', 'l'],
    badge: 'Partner Touring',
    desc: 'Custom-drawn chromoly frame with synchronized cranksets, dual handcrafted Brooks England leather saddles, and 203mm hydraulic disc rotors.',
    image: 'assets/images/fleet-tandem-grand-tourer.jpg'
  },
  {
    id: 'tandem-sport',
    name: 'Velo Sport Synchronized Tandem',
    category: 'tandem',
    categoryName: 'Sport Tandem',
    price: 32,
    rating: '4.9 (130)',
    range: 'Unlimited (2 Riders)',
    weight: '17.8 kg',
    gears: '2x11 Shimano GRX Gravel Tandem',
    heights: ['m', 'l'],
    badge: 'Sport Tandem',
    desc: 'Performance tandem built with hydroformed alloy tubing, gravel tires, and precision drop handlebars for spirited duo cycling.',
    image: 'assets/images/fleet-tandem-sport.jpg'
  },
  {
    id: 'tandem-comfort',
    name: 'Velo Easy-Ride Step Tandem',
    category: 'tandem',
    categoryName: 'Comfort Step Tandem',
    price: 28,
    rating: '4.8 (95)',
    range: 'Unlimited (2 Riders)',
    weight: '20.1 kg',
    gears: '8-Speed Internal Nexus Hub',
    heights: ['s', 'm'],
    badge: 'Step Tandem',
    desc: 'Twin low step-through openings for effortless mounting and comfortable upright cruising along beach and river promenades.',
    image: 'assets/images/fleet-tandem-vista.jpg'
  },
  {
    id: 'tandem-heritage',
    name: 'Velo Heritage Twin Tourer',
    category: 'tandem',
    categoryName: 'Heritage Tandem',
    price: 30,
    rating: '4.9 (110)',
    range: 'Unlimited (2 Riders)',
    weight: '19.8 kg',
    gears: 'Shimano Deore 9-Speed + Dual Racks',
    heights: ['m', 'l'],
    badge: 'Expedition',
    desc: 'Equipped with front and rear Ortlieb pannier racks, heavy-duty 48-spoke wheels, and dual water bottle cages for full-day expeditions.',
    image: 'assets/images/fleet-tandem-electric.jpg'
  },

  // --- Category: Family & Cargo (4 distinct models) ---
  {
    id: 'cargo-longtail',
    name: 'Velo E-Cargo Longtail Hauler',
    category: 'cargo',
    categoryName: 'Electric Cargo Longtail',
    price: 45,
    rating: '4.8 (95)',
    range: 'Up to 75 km',
    weight: '26.5 kg',
    gears: 'Enviolo Cargo + 80kg Rear Deck',
    heights: ['s', 'm', 'l'],
    badge: 'Dual Child Seats',
    desc: 'Heavy-duty longtail electric cargo bicycle. Features dual padded rear child seats with safety bars, double kickstand, and massive grocery capacity.',
    image: 'assets/images/fleet-cargo-longtail.jpg'
  },
  {
    id: 'cargo-frontbox',
    name: 'Velo Family Front-Box Cargo',
    category: 'cargo',
    categoryName: 'Front-Loader Bakfiets',
    price: 52,
    rating: '5.0 (140)',
    range: 'Up to 70 km (Bosch Cargo Line)',
    weight: '34.0 kg',
    gears: 'Enviolo Stepless + 100kg Box',
    heights: ['s', 'm', 'l'],
    badge: 'Front Box Cargo',
    desc: 'Premium European front-loading wooden box cargo bike with 3-point seatbelts for 2 toddlers and transparent rain canopy.',
    image: 'assets/images/fleet-cargo-box-edrive.jpg'
  },
  {
    id: 'cargo-compact',
    name: 'Velo Compact Utility Cargo',
    category: 'cargo',
    categoryName: 'Compact Urban Cargo',
    price: 38,
    rating: '4.9 (85)',
    range: 'Up to 85 km',
    weight: '23.5 kg',
    gears: 'Shimano Deore 10-Speed + Twin Racks',
    heights: ['s', 'm', 'l'],
    badge: 'Agile Utility',
    desc: 'Same length as a standard bicycle but engineered with heavy front and rear cargo racks capable of carrying 50kg of cargo easily.',
    image: 'assets/images/fleet-cargo-front-loader.jpg'
  },
  {
    id: 'cargo-twin',
    name: 'Velo Twin-Seat Hauler Pro',
    category: 'cargo',
    categoryName: 'Heavy Hauler Pro',
    price: 48,
    rating: '4.9 (110)',
    range: 'Up to 80 km (Dual 1000Wh)',
    weight: '28.0 kg',
    gears: 'Rohloff 14-Speed Electronic E-Shift',
    heights: ['s', 'm', 'l'],
    badge: '120kg Payload',
    desc: 'Commercial-grade electric cargo hauler with dual battery capacity, reinforced four-piston Magura brakes, and heavy-duty centerstand.',
    image: 'assets/images/fleet-cargo-trailer.jpg'
  }
];

let activeBikeForBooking = fleetCatalogData[0];

function initFleetPageCatalog() {
  const filterBtns = document.querySelectorAll('.fleet-filter-btn');
  const heightSelect = document.getElementById('fleet-height-filter');
  const sortSelect = document.getElementById('fleet-sort-select');
  const gridContainer = document.getElementById('fleet-catalog-grid');
  const countIndicator = document.getElementById('fleet-count-indicator');
  const paginationNav = document.getElementById('fleet-pagination-nav');
  const paginationInfo = document.getElementById('fleet-pagination-info');
  const paginationContainer = document.getElementById('fleet-pagination-container');

  if (!gridContainer) return;

  let currentCategory = 'all';
  let currentHeight = 'all';
  let currentSort = 'popular';
  let currentPage = 1;
  const itemsPerPage = 4; // Exactly 4 models per page in 4-column layout

  function renderCatalog(scrollOnChange = false) {
    let filtered = fleetCatalogData.filter(item => {
      const matchCat = currentCategory === 'all' || item.category === currentCategory;
      const matchHeight = currentHeight === 'all' || item.heights.includes(currentHeight);
      return matchCat && matchHeight;
    });

    if (currentSort === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    }

    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const paginatedItems = filtered.slice(startIndex, endIndex);

    if (countIndicator) {
      if (totalItems > 0) {
        countIndicator.textContent = `Showing ${startIndex + 1}–${endIndex} of ${totalItems} models`;
      } else {
        countIndicator.textContent = `Showing 0 models`;
      }
    }

    if (totalItems === 0) {
      gridContainer.innerHTML = `
        <div class="col-span-full py-16 text-center text-[#171A18] dark:text-white">
          <p class="text-base font-semibold">No bicycle models match the selected filter combination.</p>
          <button type="button" id="reset-fleet-filters" class="btn-secondary px-4 py-2 rounded-lg text-xs font-bold mt-4">Reset All Filters</button>
        </div>
      `;
      if (paginationContainer) paginationContainer.classList.add('hidden');
      const resetBtn = document.getElementById('reset-fleet-filters');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          currentCategory = 'all';
          currentHeight = 'all';
          currentPage = 1;
          if (heightSelect) heightSelect.value = 'all';
          filterBtns.forEach(b => b.classList.toggle('active', b.dataset.category === 'all'));
          renderCatalog();
        });
      }
      return;
    }

    if (paginationContainer) paginationContainer.classList.remove('hidden');

    gridContainer.innerHTML = paginatedItems.map(item => `
      <article class="fleet-card p-5 sm:p-6 shadow-sm relative overflow-hidden group bg-white dark:bg-[#173A20] border border-[#D9DDD8] dark:border-white/10 rounded-2xl flex flex-col justify-between h-full">
        <div>
          <!-- Top Badge & Price (Always 1 Single Line, Guaranteed No Wrap) -->
          <div class="flex items-center justify-between gap-2 mb-4">
            <span class="px-2 sm:px-2.5 py-1 rounded-md bg-[#173A20]/10 dark:bg-[#C8D62C]/20 text-[#28552E] dark:text-[#C8D62C] text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-tight border border-[#28552E]/30 dark:border-[#C8D62C]/30 shrink min-w-0 truncate whitespace-nowrap" title="${item.badge}">
              ${item.badge}
            </span>
            <div class="font-mono font-extrabold text-lg sm:text-xl text-[#171A18] dark:text-white shrink-0 whitespace-nowrap leading-none flex items-baseline gap-1">
              <span>$${item.price}</span>
              <span class="text-xs font-normal text-[#171A18]/70 dark:text-white/70">/day</span>
            </div>
          </div>

          <!-- Bicycle Photo Visual -->
          <div class="aspect-[4/3] rounded-xl overflow-hidden bg-[#F7F7F2] dark:bg-[#0B2415] p-3 mb-5 border border-black/5 dark:border-white/5 flex items-center justify-center img-zoom-container">
            <img src="${item.image}" alt="${item.name}" class="w-full h-full object-contain" loading="lazy" />
          </div>

          <!-- Category & Model Title -->
          <div class="text-xs font-mono font-semibold text-[#28552E] dark:text-[#C8D62C] uppercase mb-1">${item.categoryName}</div>
          <h3 class="font-display font-bold text-lg sm:text-xl text-[#171A18] dark:text-white mb-2 min-h-[3rem] flex items-start group-hover:text-[#28552E] dark:group-hover:text-[#C8D62C] transition-colors leading-snug" title="${item.name}">
            ${item.name}
          </h3>
          <p class="text-xs text-[#171A18]/80 dark:text-white/80 leading-relaxed mb-4 line-clamp-2 min-h-[2.5rem]">
            ${item.desc}
          </p>

          <!-- Key Specs Badges -->
          <div class="grid grid-cols-2 gap-2 text-xs font-mono border-t border-black/5 dark:border-white/5 pt-3 mb-4">
            <div class="p-2.5 rounded-lg bg-[#F7F7F2] dark:bg-[#0B2415]">
              <span class="block text-[10px] text-[#171A18] dark:text-white font-bold">RANGE</span>
              <span class="font-semibold text-[#171A18] dark:text-white truncate block">${item.range}</span>
            </div>
            <div class="p-2.5 rounded-lg bg-[#F7F7F2] dark:bg-[#0B2415]">
              <span class="block text-[10px] text-[#171A18] dark:text-white font-bold">GEARING</span>
              <span class="font-semibold text-[#171A18] dark:text-white truncate block" title="${item.gears}">${item.gears}</span>
            </div>
          </div>
        </div>

        <!-- Action Button -->
        <button type="button" data-bike-id="${item.id}" class="open-booking-modal-btn btn-primary w-full py-3 rounded-lg text-xs font-bold inline-flex items-center justify-center gap-2 shadow-sm mt-auto">
          <span>Configure &amp; Rent</span>
          <svg class="w-3.5 h-3.5 rtl-flip" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </button>
      </article>
    `).join('');

    // Render Pagination Controls
    renderPaginationControls(totalPages, totalItems, startIndex, endIndex);

    // Reattach booking modal clicks
    document.querySelectorAll('.open-booking-modal-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.bikeId;
        const bike = fleetCatalogData.find(b => b.id === id);
        if (bike) openBookingModal(bike);
      });
    });

    if (scrollOnChange) {
      const section = document.getElementById('fleet-catalog-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  function renderPaginationControls(totalPages, totalItems, startIndex, endIndex) {
    if (paginationInfo) {
      paginationInfo.innerHTML = `
        <span class="font-bold text-[#28552E] dark:text-[#C8D62C]">Page ${currentPage} of ${totalPages}</span>
        <span class="text-[#171A18]/70 dark:text-white/70 ml-2">· Showing ${startIndex + 1}–${endIndex} of ${totalItems} models</span>
      `;
    }

    if (!paginationNav) return;

    let navHtml = '';

    // Previous Button
    const isPrevDisabled = currentPage === 1;
    navHtml += `
      <button type="button" id="fleet-page-prev" class="pagination-btn pagination-prev-next px-3 py-2 rounded-lg text-xs font-mono font-bold inline-flex items-center gap-1.5 border border-[#D9DDD8] dark:border-white/10 bg-white dark:bg-[#0B2415] text-[#171A18] dark:text-white hover:border-[#28552E] dark:hover:border-[#C8D62C] hover:bg-[#F7F7F2] dark:hover:bg-[#173A20] transition-colors ${isPrevDisabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}" aria-label="Previous Page" ${isPrevDisabled ? 'disabled' : ''}>
        <svg class="w-3.5 h-3.5 rtl-flip" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
        <span>Prev</span>
      </button>
    `;

    // Page Numbers
    for (let p = 1; p <= totalPages; p++) {
      const isActive = p === currentPage;
      navHtml += `
        <button type="button" data-page="${p}" class="fleet-page-num-btn pagination-btn w-9 h-9 rounded-lg text-xs font-mono font-bold flex items-center justify-center transition-all ${isActive ? 'bg-[#28552E] text-[#C8D62C] dark:bg-[#C8D62C] dark:text-[#102C19] shadow-sm font-black ring-2 ring-[#28552E]/20' : 'bg-white dark:bg-[#0B2415] border border-[#D9DDD8] dark:border-white/10 text-[#171A18] dark:text-white hover:bg-[#F7F7F2] dark:hover:bg-[#173A20] hover:border-[#28552E] dark:hover:border-[#C8D62C]'}" aria-label="Page ${p}" ${isActive ? 'aria-current="page"' : ''}>
          ${p < 10 ? '0' + p : p}
        </button>
      `;
    }

    // Next Button
    const isNextDisabled = currentPage === totalPages;
    navHtml += `
      <button type="button" id="fleet-page-next" class="pagination-btn pagination-prev-next px-3 py-2 rounded-lg text-xs font-mono font-bold inline-flex items-center gap-1.5 border border-[#D9DDD8] dark:border-white/10 bg-white dark:bg-[#0B2415] text-[#171A18] dark:text-white hover:border-[#28552E] dark:hover:border-[#C8D62C] hover:bg-[#F7F7F2] dark:hover:bg-[#173A20] transition-colors ${isNextDisabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}" aria-label="Next Page" ${isNextDisabled ? 'disabled' : ''}>
        <span>Next</span>
        <svg class="w-3.5 h-3.5 rtl-flip" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    `;

    paginationNav.innerHTML = navHtml;

    // Attach pagination click handlers
    const prevBtn = document.getElementById('fleet-page-prev');
    if (prevBtn && !isPrevDisabled) {
      prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
          currentPage--;
          renderCatalog(true);
        }
      });
    }

    const nextBtn = document.getElementById('fleet-page-next');
    if (nextBtn && !isNextDisabled) {
      nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
          currentPage++;
          renderCatalog(true);
        }
      });
    }

    document.querySelectorAll('.fleet-page-num-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const pageNum = parseInt(btn.dataset.page, 10);
        if (pageNum && pageNum !== currentPage) {
          currentPage = pageNum;
          renderCatalog(true);
        }
      });
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentCategory = btn.dataset.category;
      currentPage = 1;
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCatalog();
    });
  });

  if (heightSelect) {
    heightSelect.addEventListener('change', (e) => {
      currentHeight = e.target.value;
      currentPage = 1;
      renderCatalog();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      currentPage = 1;
      renderCatalog();
    });
  }

  renderCatalog();
  initSizingSlider();
  initBookingModal();
}

/* -------------------------------------------------------------------------- */
/* Sizing Guide Height Slider Calculator                                      */
/* -------------------------------------------------------------------------- */
function initSizingSlider() {
  const slider = document.getElementById('height-range-slider');
  const heightVal = document.getElementById('slider-height-val');
  const frameResult = document.getElementById('slider-frame-result');
  const standoverResult = document.getElementById('slider-standover-result');
  const descResult = document.getElementById('slider-desc-result');

  if (!slider) return;

  function updateSizing(val) {
    const h = parseInt(val, 10);
    if (heightVal) heightVal.textContent = `${h} cm (${Math.floor(h / 30.48)}' ${Math.round((h % 30.48) / 2.54)}")`;

    let frame = 'Size M (52–54 cm)';
    let standover = '77 cm (30.3 in)';
    let desc = 'Medium frame recommended for balanced control, upright comfort, and swift handling.';

    if (h < 165) {
      frame = 'Size S (46–48 cm)';
      standover = '72 cm (28.3 in)';
      desc = 'Small frame with low standover height and shorter reach for agile city maneuvering.';
    } else if (h > 182) {
      frame = 'Size L (56–58 cm)';
      standover = '83 cm (32.6 in)';
      desc = 'Large frame engineered with extended top tube for taller riders seeking ergonomic extension.';
    }

    if (frameResult) frameResult.textContent = frame;
    if (standoverResult) standoverResult.textContent = standover;
    if (descResult) descResult.textContent = desc;
  }

  slider.addEventListener('input', (e) => updateSizing(e.target.value));
}

/* -------------------------------------------------------------------------- */
/* Fleet Booking & Configuration Modal                                        */
/* -------------------------------------------------------------------------- */
function initBookingModal() {
  const modal = document.getElementById('fleet-booking-modal');
  const closeBtn = document.getElementById('close-booking-modal');
  const overlay = document.getElementById('booking-modal-backdrop');
  const form = document.getElementById('modal-booking-form');

  if (!modal) return;

  function closeModal() {
    modal.classList.add('opacity-0', 'pointer-events-none');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('pointer-events-none')) {
      closeModal();
    }
  });

  const durationSelect = document.getElementById('modal-duration-select');
  const accessoryChecks = document.querySelectorAll('.modal-addon-check');

  function calculateModalPrice() {
    if (!activeBikeForBooking) return;
    const days = parseInt(durationSelect ? durationSelect.value : '1', 10);
    let base = activeBikeForBooking.price * days;

    let addons = 0;
    accessoryChecks.forEach(chk => {
      if (chk.checked) {
        addons += (parseFloat(chk.dataset.dailyPrice || '0') * days);
      }
    });

    const total = base + addons;
    const totalEl = document.getElementById('modal-total-price');
    if (totalEl) totalEl.textContent = `$${total.toFixed(0)}`;
  }

  if (durationSelect) durationSelect.addEventListener('change', calculateModalPrice);
  accessoryChecks.forEach(chk => chk.addEventListener('change', calculateModalPrice));

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert(`Booking Confirmed for ${activeBikeForBooking.name}! A digital receipt & QR unlock pass has been generated.`);
      closeModal();
    });
  }
}

function openBookingModal(bike) {
  activeBikeForBooking = bike;
  const modal = document.getElementById('fleet-booking-modal');
  const titleEl = document.getElementById('modal-bike-name');
  const priceEl = document.getElementById('modal-bike-daily-rate');
  const imgEl = document.getElementById('modal-bike-img');
  const catEl = document.getElementById('modal-bike-cat');

  if (!modal) return;

  if (titleEl) titleEl.textContent = bike.name;
  if (priceEl) priceEl.textContent = `$${bike.price}/day base`;
  if (catEl) catEl.textContent = bike.categoryName;
  if (imgEl) {
    imgEl.src = bike.image;
    imgEl.alt = bike.name;
  }

  const durationSelect = document.getElementById('modal-duration-select');
  if (durationSelect) durationSelect.value = '1';

  document.querySelectorAll('.modal-addon-check').forEach(chk => {
    chk.checked = false;
  });

  const totalEl = document.getElementById('modal-total-price');
  if (totalEl) totalEl.textContent = `$${bike.price}`;

  modal.classList.remove('opacity-0', 'pointer-events-none');
  document.body.style.overflow = 'hidden';
}

/* -------------------------------------------------------------------------- */
/* 14. Guided Tours Page Engine                                               */
/* -------------------------------------------------------------------------- */
const tourItineraryData = {
  historic: {
    id: 'historic',
    title: 'Historic Old Town & Cathedral Discovery',
    category: 'historic',
    price: 39,
    duration: '2.5 Hours',
    distance: '12.5 km',
    elevation: '+45m (Gentle)',
    pace: 'Easy & Relaxed',
    groupCap: 'Max 8 Riders',
    rating: '5.0 (340)',
    guide: 'Dr. Elena Rossi (Architectural Historian)',
    badge: 'Most Popular Cultural Tour',
    image: 'assets/images/tours-old-town.jpg',
    desc: 'Wind through 800 years of preserved guildhalls, hidden Roman courtyards, cobblestone arches, and the monumental cathedral cloister with wireless audio commentary.',
    departureTimes: ['10:00 AM', '02:30 PM'],
    stops: [
      { name: 'Münsterhof Hub', desc: 'Meet your guide, receive whisper headset & custom bike fitting' },
      { name: 'Old City Gate & Fortifications', desc: '14th-century gate towers and ancient moat history' },
      { name: 'Roman Bath Ruins', desc: 'Subterranean archeological foundations and civic origins' },
      { name: 'Cathedral Cloister', desc: 'Gothic architecture & vaulted stone courtyard access' },
      { name: 'Historic Guildhall Square', desc: 'Grand medieval merchant houses and fountain statues' },
      { name: 'Artisan Roastery Stop', desc: 'Complimentary single-origin espresso and local pastries' }
    ]
  },
  modernist: {
    id: 'modernist',
    title: 'Modernist Architecture & Bauhaus Quarter',
    category: 'historic',
    price: 45,
    duration: '3.0 Hours',
    distance: '16.0 km',
    elevation: '+30m (Flat)',
    pace: 'Moderate Cruise',
    groupCap: 'Max 8 Riders',
    rating: '4.9 (195)',
    guide: 'Marco Weber (Urban Geographer)',
    badge: 'Design & Architecture',
    image: 'assets/images/tours-architecture.jpg',
    desc: 'Explore landmark structural achievements: brutalist concrete pavilions, modern glass pedestrian bridges, avant-garde design centers, and urban revitalizations.',
    departureTimes: ['10:30 AM', '03:00 PM'],
    stops: [
      { name: 'Central Station North Hub', desc: 'Modern transit architecture briefing & bicycle launch' },
      { name: 'Glass Transit Pavilion', desc: 'Sleek steel and tensile membrane structural analysis' },
      { name: 'Steel Viaduct Cultural Park', desc: 'Adaptive reuse of industrial arches into artisan ateliers' },
      { name: 'Museum of Design', desc: 'Swiss typography, modernist movement & facade tour' },
      { name: 'Contemporary Art Center', desc: 'Public sculpture plaza and modern canal waterfront' }
    ]
  },
  sunset: {
    id: 'sunset',
    title: 'Sunset River Promenade & Wine Tasting Ride',
    category: 'sunset',
    price: 49,
    duration: '2.5 Hours',
    distance: '18.0 km',
    elevation: '+20m (Flat)',
    pace: 'Easy Flat',
    groupCap: 'Max 8 Riders',
    rating: '5.0 (480)',
    guide: 'Chloe Dubois (Sommelier & Cultural Guide)',
    badge: 'Golden Hour Experience',
    image: 'assets/images/tours-sunset-wine.jpg',
    desc: 'Glide along the car-free river promenade as the sun sets over the water. Concludes with an exclusive outdoor local wine tasting and artisanal cheese platter terrace.',
    departureTimes: ['05:30 PM (Sunset Exclusive)'],
    stops: [
      { name: 'Seestrasse Marina Hub', desc: 'Evening departure with sunset view trajectory' },
      { name: 'West Riverbank Path', desc: 'Golden hour reflection photography & willow trails' },
      { name: 'Sunset Beach Pier', desc: 'Watch the sun drop behind the distant mountain ridge' },
      { name: 'Lakeside Vineyard Terrace', desc: 'Private reserved seating for regional wine degustation' },
      { name: 'Illuminated Return Loop', desc: 'Magical dusk ride under tree-lined lampposts' }
    ]
  },
  alpine: {
    id: 'alpine',
    title: 'Alpine Skyline & Hilltop Panorama (E-Bike)',
    category: 'alpine',
    price: 59,
    duration: '3.5 Hours',
    distance: '22.0 km',
    elevation: '+195m (Climb)',
    pace: 'E-Bike Assist',
    groupCap: 'Max 6 Riders',
    rating: '4.9 (210)',
    guide: 'Julian Meier (Certified MTB & Alpine Leader)',
    badge: 'Breathtaking 360° Vistas',
    image: 'assets/images/tours-alpine-skyline.jpg',
    desc: 'Effortlessly ascend to the highest panoramic ridge overlooking the entire city, lake, and snow-capped Alpine peaks powered by high-torque Bosch e-bikes.',
    departureTimes: ['09:30 AM', '02:00 PM'],
    stops: [
      { name: 'Lower Mountain Hub', desc: 'Bosch E-Bike orientation & power mode setup' },
      { name: 'Pine Forest Ridge Trail', desc: 'Smooth paved switchbacks through alpine woodland' },
      { name: 'Skyline Overlook Peak', desc: 'Panoramic 360-degree viewing platform & photo stop' },
      { name: 'Medieval Castle Ruins', desc: 'Ancient hilltop fortress towers and historical lore' },
      { name: 'Botanical Hilltop Terrace', desc: 'Alpine herbal tea and panoramic lake views' }
    ]
  }
};

let activeTourForBooking = tourItineraryData.historic;

function initToursPage() {
  const tourTabs = document.querySelectorAll('.tour-visualizer-tab');
  const tourFilterBtns = document.querySelectorAll('.tour-filter-pill');
  const tourCards = document.querySelectorAll('.tour-catalog-card');

  const visTitle = document.getElementById('tour-vis-title');
  const visBadge = document.getElementById('tour-vis-badge');
  const visDuration = document.getElementById('tour-vis-duration');
  const visDistance = document.getElementById('tour-vis-distance');
  const visElevation = document.getElementById('tour-vis-elevation');
  const visGuide = document.getElementById('tour-vis-guide');
  const visDesc = document.getElementById('tour-vis-desc');
  const visImg = document.getElementById('tour-vis-img');
  const visStopsContainer = document.getElementById('tour-vis-stops');

  function selectTourItinerary(key) {
    const data = tourItineraryData[key];
    if (!data) return;

    tourTabs.forEach(tab => {
      const isCurrent = tab.dataset.tourKey === key;
      tab.classList.toggle('active', isCurrent);
      tab.classList.toggle('border-[#C8D62C]', isCurrent);
      tab.classList.toggle('bg-[#C8D62C]', isCurrent);
      tab.classList.toggle('text-[#171A18]', isCurrent);
    });

    if (visImg) {
      visImg.style.opacity = '0.3';
      setTimeout(() => {
        visImg.src = data.image;
        visImg.alt = data.title;
        visImg.style.opacity = '1';
      }, 150);
    }

    if (visTitle) visTitle.textContent = data.title;
    if (visBadge) visBadge.textContent = data.badge;
    if (visDuration) visDuration.textContent = data.duration;
    if (visDistance) visDistance.textContent = data.distance;
    if (visElevation) visElevation.textContent = data.elevation;
    if (visGuide) visGuide.textContent = data.guide;
    if (visDesc) visDesc.textContent = data.desc;

    if (visStopsContainer) {
      visStopsContainer.innerHTML = data.stops.map((stop, i) => `
        <div class="flex items-start gap-3 text-xs">
          <div class="w-6 h-6 rounded-full bg-[#173A20]/10 dark:bg-[#C8D62C]/20 text-[#28552E] dark:text-[#C8D62C] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 border border-[#28552E]/30 dark:border-[#C8D62C]/30">
            0${i + 1}
          </div>
          <div class="text-xs text-[#171A18] dark:text-white space-y-1">
            <span class="font-display font-bold text-sm text-[#171A18] dark:text-white block">${stop.name}</span>
            <span class="text-[#171A18] dark:text-white font-sans">${stop.desc}</span>
          </div>
        </div>
      `).join('');
    }
  }

  tourTabs.forEach(tab => {
    tab.addEventListener('click', () => selectTourItinerary(tab.dataset.tourKey));
  });

  tourFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.tourCat;

      // Update button active / inactive state using existing classes
      tourFilterBtns.forEach(b => {
        const isActive = b === btn;
        b.classList.toggle('active', isActive);
        if (isActive) {
          b.classList.add('bg-[#C8D62C]', 'text-[#171A18]');
          b.classList.remove('bg-[#F7F7F2]', 'dark:bg-[#0B2415]', 'dark:text-white');
        } else {
          b.classList.remove('active', 'bg-[#C8D62C]', 'text-[#171A18]');
          b.classList.add('bg-[#F7F7F2]', 'dark:bg-[#0B2415]', 'text-[#171A18]', 'dark:text-white');
        }
      });

      // Filter cards with smooth fade + translate transition
      tourCards.forEach(card => {
        const categories = (card.dataset.category || '').toLowerCase().split(/\s+/);
        const shouldShow = cat === 'all' || categories.includes(cat);

        if (shouldShow) {
          if (card.style.display === 'none' || card.classList.contains('hidden')) {
            card.style.display = 'flex';
            card.classList.remove('hidden');
            card.style.opacity = '0';
            card.style.transform = 'scale(0.96) translateY(12px)';
            card.style.transition = 'opacity 300ms cubic-bezier(0.16, 1, 0.3, 1), transform 300ms cubic-bezier(0.16, 1, 0.3, 1)';
            
            // Trigger animation in
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1) translateY(0)';
              });
            });
          } else {
            card.style.opacity = '1';
            card.style.transform = 'scale(1) translateY(0)';
          }
        } else {
          card.style.transition = 'opacity 250ms cubic-bezier(0.16, 1, 0.3, 1), transform 250ms cubic-bezier(0.16, 1, 0.3, 1)';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96) translateY(12px)';
          
          setTimeout(() => {
            const currentActiveBtn = document.querySelector('.tour-filter-pill.active');
            const currentCat = currentActiveBtn ? currentActiveBtn.dataset.tourCat : 'all';
            const stillHide = currentCat !== 'all' && !categories.includes(currentCat);
            if (stillHide) {
              card.style.display = 'none';
              card.classList.add('hidden');
            }
          }, 250);
        }
      });
    });
  });

  initTourBookingModal();
}

function initTourBookingModal() {
  const modal = document.getElementById('tour-booking-modal');
  const closeBtn = document.getElementById('close-tour-modal');
  const backdrop = document.getElementById('tour-modal-backdrop');
  const form = document.getElementById('tour-booking-form');

  const titleEl = document.getElementById('tour-modal-title');
  const priceEl = document.getElementById('tour-modal-price');
  const durationEl = document.getElementById('tour-modal-duration');
  const timeSlotContainer = document.getElementById('tour-modal-times');
  const riderSelect = document.getElementById('tour-rider-count');
  const ebikeUpgradeCheck = document.getElementById('tour-ebike-upgrade');
  const totalDisplay = document.getElementById('tour-modal-total');

  if (!modal) return;

  function closeTourModal() {
    modal.classList.add('opacity-0', 'pointer-events-none');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeTourModal);
  if (backdrop) backdrop.addEventListener('click', closeTourModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('pointer-events-none')) {
      closeTourModal();
    }
  });

  function calculateTourTotal() {
    if (!activeTourForBooking) return;
    const riders = parseInt(riderSelect ? riderSelect.value : '1', 10);
    const hasEbike = ebikeUpgradeCheck && ebikeUpgradeCheck.checked;
    const unitPrice = activeTourForBooking.price + (hasEbike ? 12 : 0);
    const total = unitPrice * riders;

    if (totalDisplay) totalDisplay.textContent = `$${total.toFixed(0)}`;
  }

  if (riderSelect) riderSelect.addEventListener('change', calculateTourTotal);
  if (ebikeUpgradeCheck) ebikeUpgradeCheck.addEventListener('change', calculateTourTotal);

  document.querySelectorAll('.open-tour-booking-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tourKey = btn.dataset.tourKey || 'historic';
      const tour = tourItineraryData[tourKey];
      if (tour) {
        activeTourForBooking = tour;
        if (titleEl) titleEl.textContent = tour.title;
        if (priceEl) priceEl.textContent = `$${tour.price} / rider`;
        if (durationEl) durationEl.textContent = `${tour.duration} • ${tour.distance} • ${tour.groupCap}`;
        
        if (timeSlotContainer) {
          timeSlotContainer.innerHTML = tour.departureTimes.map((t, idx) => `
            <label class="flex items-center gap-2 p-2.5 rounded-lg bg-white dark:bg-[#173A20] border border-[#D9DDD8] dark:border-white/10 cursor-pointer text-xs font-mono text-[#171A18] dark:text-white">
              <input type="radio" name="tour_time" value="${t}" ${idx === 0 ? 'checked' : ''} class="text-[#28552E] dark:text-[#C8D62C] focus:ring-[#C8D62C]" />
              <span>${t}</span>
            </label>
          `).join('');
        }

        if (riderSelect) riderSelect.value = '1';
        if (ebikeUpgradeCheck) ebikeUpgradeCheck.checked = false;
        calculateTourTotal();

        modal.classList.remove('opacity-0', 'pointer-events-none');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert(`Tour Reserved for ${activeTourForBooking.title}! Your guide confirmation & meeting location map have been sent.`);
      closeTourModal();
    });
  }
}

/* -------------------------------------------------------------------------- */
/* 15. Pickup Locations & Station Network Engine                             */
/* -------------------------------------------------------------------------- */
const allStationsNetwork = [
  {
    id: 'central-station',
    name: 'Central Railway Station Mega-Hub',
    district: 'Downtown District 1',
    address: 'Bahnhofplatz 1 (Track 18 Exit)',
    cruisers: 22,
    ebikes: 18,
    tandems: 2,
    emptyDocks: 18,
    totalDocks: 60,
    is247: true,
    hasBatterySwap: true,
    hasAttendant: true,
    nearTransit: true,
    amenities: ['Repair Stand', 'Air Pump', 'Attendant 07-22', 'Battery Swaps', 'Water Refill'],
    image: 'assets/images/locations-central-hub.jpg'
  },
  {
    id: 'old-town-plaza',
    name: 'Historic Old Town Plaza Hub',
    district: 'Altstadt District 1',
    address: 'Münsterhof 8 (Cathedral Square)',
    cruisers: 10,
    ebikes: 6,
    tandems: 2,
    emptyDocks: 12,
    totalDocks: 30,
    is247: false,
    hasBatterySwap: true,
    hasAttendant: true,
    nearTransit: false,
    amenities: ['Air Pump', 'Attendant 08-20', 'Pannier Rental', 'Historical Map Kiosk'],
    image: 'assets/images/locations-oldtown-hub.jpg'
  },
  {
    id: 'waterfront-marina',
    name: ' Promenade &Marina Hub',
    district: 'Lakeside District 2',
    address: 'Seestrasse 44 (Marina Pier 3)',
    cruisers: 15,
    ebikes: 12,
    tandems: 2,
    emptyDocks: 15,
    totalDocks: 44,
    is247: true,
    hasBatterySwap: true,
    hasAttendant: false,
    nearTransit: false,
    amenities: ['Solar Powered', 'Air Pump', 'Battery Swaps', 'Beach Locker Storage'],
    image: 'assets/images/locations-marina-hub.jpg'
  },
  {
    id: 'university-campus',
    name: 'ETH / University Campus Hub',
    district: 'University District 6',
    address: 'Rämistrasse 101 (Polyterrasse)',
    cruisers: 14,
    ebikes: 16,
    tandems: 0,
    emptyDocks: 10,
    totalDocks: 40,
    is247: true,
    hasBatterySwap: true,
    hasAttendant: false,
    nearTransit: true,
    amenities: ['Repair Stand', 'High-Speed E-Charger', 'Student Pass Validator'],
    image: 'assets/images/locations-university-hub.jpg'
  },
  {
    id: 'west-creative-quarter',
    name: 'West Industrial Design Quarter',
    district: 'Züri West District 5',
    address: 'Hardstrasse 219 (Viadukt Arches)',
    cruisers: 12,
    ebikes: 14,
    tandems: 2,
    emptyDocks: 12,
    totalDocks: 40,
    is247: true,
    hasBatterySwap: true,
    hasAttendant: true,
    nearTransit: true,
    amenities: ['Repair Stand', 'Air Pump', 'Cargo Bike Drop', 'Night Keyless Entry'],
    image: 'assets/images/locations-viaduct-hub.jpg'
  },
  {
    id: 'botanical-gardens',
    name: 'Botanical Gardens Green Corridor',
    district: 'Park District 8',
    address: 'Zollikerstrasse 107',
    cruisers: 8,
    ebikes: 6,
    tandems: 2,
    emptyDocks: 14,
    totalDocks: 30,
    is247: false,
    hasBatterySwap: false,
    hasAttendant: false,
    nearTransit: false,
    amenities: ['Picnic Gear Lockers', 'Air Pump', 'Water Fountain'],
    image: 'assets/images/home-lifestyle.jpg'
  },
  {
    id: 'financial-paradeplatz',
    name: 'Paradeplatz Financial Hub',
    district: 'Banking Center District 1',
    address: 'Bahnhofstrasse 28',
    cruisers: 16,
    ebikes: 18,
    tandems: 0,
    emptyDocks: 8,
    totalDocks: 42,
    is247: true,
    hasBatterySwap: true,
    hasAttendant: false,
    nearTransit: true,
    amenities: ['Contactless NFC Tap', 'Air Pump', 'Express Commuter Docks'],
    image: 'assets/images/home-hero.jpg'
  },
  {
    id: 'sunset-beach-marina',
    name: 'Sunset Beach & Lido Hub',
    district: 'South Strand District 2',
    address: 'Mythenquai 79 (Strandbad Entry)',
    cruisers: 14,
    ebikes: 8,
    tandems: 4,
    emptyDocks: 14,
    totalDocks: 40,
    is247: true,
    hasBatterySwap: false,
    hasAttendant: true,
    nearTransit: false,
    amenities: ['Tandem Specialist Hub', 'Helmet Sterilizer', 'Towel & Locker Kiosk'],
    image: 'assets/images/locations-funicular-hub.jpg'
  },
  {
    id: 'funicular-polybahn',
    name: 'Polybahn & Panorama Ridge Hub',
    district: 'Ridge District 7',
    address: 'Polybahnplatz 3 (Upper Cable Station)',
    cruisers: 10,
    ebikes: 14,
    tandems: 2,
    emptyDocks: 10,
    totalDocks: 36,
    is247: true,
    hasBatterySwap: true,
    hasAttendant: true,
    nearTransit: true,
    amenities: ['E-Bike Climb Assist', 'Scenic Viewpoint Kiosk', 'Battery Swaps', 'Air Pump'],
    image: 'assets/images/locations-funicular-hub.jpg'
  }
];

function initLocationsPage() {
  const directoryGrid = document.getElementById('locations-directory-grid');
  const searchInput = document.getElementById('station-search-input');
  const filterPills = document.querySelectorAll('.station-filter-pill');
  const totalCountEl = document.getElementById('stations-count-indicator');
  const paginationNav = document.getElementById('locations-pagination-nav');
  const paginationInfo = document.getElementById('locations-pagination-info');
  const paginationContainer = document.getElementById('locations-pagination-container');

  const plannerDepSelect = document.getElementById('planner-dep-select');
  const plannerArrSelect = document.getElementById('planner-arr-select');
  const plannerDistEl = document.getElementById('planner-calc-dist');
  const plannerTimeEl = document.getElementById('planner-calc-time');
  const plannerCo2El = document.getElementById('planner-calc-co2');
  const plannerDocksEl = document.getElementById('planner-calc-docks');

  if (!directoryGrid) return;

  let currentFilter = 'all';
  let searchQuery = '';
  let currentPage = 1;
  const itemsPerPage = 3; // Exactly 3 stations per page in 3-column layout

  function renderStations(scrollOnChange = false) {
    let filtered = allStationsNetwork.filter(station => {
      const matchSearch = station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          station.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          station.address.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchFilter = true;
      if (currentFilter === '247') matchFilter = station.is247;
      if (currentFilter === 'ebike') matchFilter = station.hasBatterySwap;
      if (currentFilter === 'attendant') matchFilter = station.hasAttendant;
      if (currentFilter === 'transit') matchFilter = station.nearTransit;

      return matchSearch && matchFilter;
    });

    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const paginatedStations = filtered.slice(startIndex, endIndex);

    if (totalCountEl) {
      if (totalItems > 0) {
        totalCountEl.textContent = `Showing ${startIndex + 1}–${endIndex} of ${totalItems} Station Hubs`;
      } else {
        totalCountEl.textContent = `Showing 0 Station Hubs`;
      }
    }

    if (totalItems === 0) {
      directoryGrid.innerHTML = `
        <div class="col-span-full py-16 text-center text-[#171A18] dark:text-white">
          <p class="text-base font-semibold">No stations found matching "${searchQuery}".</p>
          <button type="button" id="reset-station-search" class="btn-secondary px-4 py-2 rounded-lg text-xs font-bold mt-4">Clear Search</button>
        </div>
      `;
      if (paginationContainer) paginationContainer.classList.add('hidden');
      const reset = document.getElementById('reset-station-search');
      if (reset) {
        reset.addEventListener('click', () => {
          searchQuery = '';
          currentFilter = 'all';
          currentPage = 1;
          if (searchInput) searchInput.value = '';
          filterPills.forEach(p => p.classList.toggle('active', p.dataset.filter === 'all'));
          renderStations();
        });
      }
      return;
    }

    if (paginationContainer) paginationContainer.classList.remove('hidden');

    directoryGrid.innerHTML = paginatedStations.map(st => {
      const totalBikes = st.cruisers + st.ebikes + st.tandems;
      return `
        <article class="velo-card p-6 shadow-sm flex flex-col justify-between space-y-5 bg-white dark:bg-[#173A20] border border-[#D9DDD8] dark:border-white/10 rounded-2xl group h-full">
          <div>
            <!-- Header Badges -->
            <div class="flex items-center justify-between gap-2 mb-3">
              <span class="text-xs font-mono font-bold text-[#28552E] dark:text-[#C8D62C] uppercase truncate">${st.district}</span>
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase shrink-0 ${st.is247 ? 'bg-[#173A20]/10 dark:bg-[#C8D62C]/20 text-[#28552E] dark:text-[#C8D62C]' : 'bg-[#F7F7F2] dark:bg-[#0B2415] text-[#171A18] dark:text-white'}">
                ${st.is247 ? 'Open 24/7' : 'All Day Hub'}
              </span>
            </div>

            <!-- Station Title & Address -->
            <h3 class="font-display font-bold text-xl text-[#171A18] dark:text-white group-hover:text-[#28552E] dark:group-hover:text-[#C8D62C] transition-colors mb-1 min-h-[3.25rem] flex items-start">
              ${st.name}
            </h3>
            <p class="text-xs font-mono text-[#171A18]/75 dark:text-white/75 mb-4">${st.address}</p>

            <!-- Real-Time Dock Availability Grid -->
            <div class="grid grid-cols-3 gap-2 text-xs font-mono mb-4 text-center">
              <div class="p-2.5 rounded-xl bg-[#F7F7F2] dark:bg-[#0B2415]">
                <span class="text-[10px] text-[#171A18] dark:text-white block font-bold">E-BIKES</span>
                <span class="font-bold text-[#28552E] dark:text-[#C8D62C] text-base">${st.ebikes}</span>
              </div>
              <div class="p-2.5 rounded-xl bg-[#F7F7F2] dark:bg-[#0B2415]">
                <span class="text-[10px] text-[#171A18] dark:text-white block font-bold">CRUISERS</span>
                <span class="font-bold text-[#171A18] dark:text-white text-base">${st.cruisers}</span>
              </div>
              <div class="p-2.5 rounded-xl bg-[#F7F7F2] dark:bg-[#0B2415]">
                <span class="text-[10px] text-[#171A18] dark:text-white block font-bold">EMPTY DOCKS</span>
                <span class="font-bold text-[#171A18] dark:text-white text-base">${st.emptyDocks}</span>
              </div>
            </div>

            <!-- Amenities Chips -->
            <div class="flex flex-wrap gap-1.5 pt-2 border-t border-black/5 dark:border-white/5">
              ${st.amenities.map(a => `<span class="px-2 py-0.5 rounded bg-[#F7F7F2] dark:bg-[#0B2415] text-[10px] font-mono text-[#171A18] dark:text-white">&bull; ${a}</span>`).join('')}
            </div>
          </div>

          <!-- Quick Reserve Button -->
          <div class="pt-4 border-t border-black/5 dark:border-white/5 mt-auto">
            <a href="fleet.html" class="btn-primary w-full py-2.5 rounded-lg text-xs font-bold inline-flex items-center justify-center gap-2 shadow-sm">
              <span>Reserve at this Hub (${totalBikes} Ready)</span>
              <svg class="w-3.5 h-3.5 rtl-flip" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
          </div>
        </article>
      `;
    }).join('');

    // Render Pagination Controls
    renderLocationsPagination(totalPages, totalItems, startIndex, endIndex);

    if (scrollOnChange) {
      const grid = document.getElementById('locations-directory-grid');
      if (grid) {
        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  function renderLocationsPagination(totalPages, totalItems, startIndex, endIndex) {
    if (paginationInfo) {
      paginationInfo.innerHTML = `
        <span class="font-bold text-[#28552E] dark:text-[#C8D62C]">Page ${currentPage} of ${totalPages}</span>
        <span class="text-[#171A18]/70 dark:text-white/70 ml-2">· Showing ${startIndex + 1}–${endIndex} of ${totalItems} Station Hubs</span>
      `;
    }

    if (!paginationNav) return;

    let navHtml = '';

    // Previous Button
    const isPrevDisabled = currentPage === 1;
    navHtml += `
      <button type="button" id="locations-page-prev" class="pagination-btn pagination-prev-next px-3 py-2 rounded-lg text-xs font-mono font-bold inline-flex items-center gap-1.5 border border-[#D9DDD8] dark:border-white/10 bg-white dark:bg-[#0B2415] text-[#171A18] dark:text-white hover:border-[#28552E] dark:hover:border-[#C8D62C] hover:bg-[#F7F7F2] dark:hover:bg-[#173A20] transition-colors ${isPrevDisabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}" aria-label="Previous Page" ${isPrevDisabled ? 'disabled' : ''}>
        <svg class="w-3.5 h-3.5 rtl-flip" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
        <span>Prev</span>
      </button>
    `;

    // Page Numbers
    for (let p = 1; p <= totalPages; p++) {
      const isActive = p === currentPage;
      navHtml += `
        <button type="button" data-loc-page="${p}" class="locations-page-num-btn pagination-btn w-9 h-9 rounded-lg text-xs font-mono font-bold flex items-center justify-center transition-all ${isActive ? 'bg-[#28552E] text-[#C8D62C] dark:bg-[#C8D62C] dark:text-[#102C19] shadow-sm font-black ring-2 ring-[#28552E]/20' : 'bg-white dark:bg-[#0B2415] border border-[#D9DDD8] dark:border-white/10 text-[#171A18] dark:text-white hover:bg-[#F7F7F2] dark:hover:bg-[#173A20] hover:border-[#28552E] dark:hover:border-[#C8D62C]'}" aria-label="Page ${p}" ${isActive ? 'aria-current="page"' : ''}>
          ${p < 10 ? '0' + p : p}
        </button>
      `;
    }

    // Next Button
    const isNextDisabled = currentPage === totalPages;
    navHtml += `
      <button type="button" id="locations-page-next" class="pagination-btn pagination-prev-next px-3 py-2 rounded-lg text-xs font-mono font-bold inline-flex items-center gap-1.5 border border-[#D9DDD8] dark:border-white/10 bg-white dark:bg-[#0B2415] text-[#171A18] dark:text-white hover:border-[#28552E] dark:hover:border-[#C8D62C] hover:bg-[#F7F7F2] dark:hover:bg-[#173A20] transition-colors ${isNextDisabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}" aria-label="Next Page" ${isNextDisabled ? 'disabled' : ''}>
        <span>Next</span>
        <svg class="w-3.5 h-3.5 rtl-flip" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    `;

    paginationNav.innerHTML = navHtml;

    // Attach pagination click handlers
    const prevBtn = document.getElementById('locations-page-prev');
    if (prevBtn && !isPrevDisabled) {
      prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
          currentPage--;
          renderStations(true);
        }
      });
    }

    const nextBtn = document.getElementById('locations-page-next');
    if (nextBtn && !isNextDisabled) {
      nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
          currentPage++;
          renderStations(true);
        }
      });
    }

    document.querySelectorAll('.locations-page-num-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const pageNum = parseInt(btn.dataset.locPage, 10);
        if (pageNum && pageNum !== currentPage) {
          currentPage = pageNum;
          renderStations(true);
        }
      });
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      currentPage = 1;
      renderStations();
    });
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      currentFilter = pill.dataset.filter;
      currentPage = 1;
      filterPills.forEach(p => p.classList.remove('active', 'bg-[#C8D62C]', 'text-[#171A18]'));
      pill.classList.add('active', 'bg-[#C8D62C]', 'text-[#171A18]');
      renderStations();
    });
  });

  renderStations();

  // Inter-Hub Route Estimator
  function updateRouteCalculation() {
    if (!plannerDistEl || !plannerTimeEl || !plannerCo2El) return;
    const depIndex = plannerDepSelect ? plannerDepSelect.selectedIndex : 0;
    const arrIndex = plannerArrSelect ? plannerArrSelect.selectedIndex : 1;

    let diff = Math.abs(arrIndex - depIndex) || 1;
    let distKm = (diff * 1.8 + 1.2).toFixed(1);
    let timeMin = Math.round(distKm * 3.4);
    let co2Grams = Math.round(distKm * 140);

    plannerDistEl.textContent = `${distKm} km`;
    plannerTimeEl.textContent = `${timeMin} Mins`;
    plannerCo2El.textContent = `${co2Grams}g CO2`;
    if (plannerDocksEl) plannerDocksEl.textContent = `${Math.max(4, 20 - diff * 3)} Empty Docks`;
  }

  if (plannerDepSelect) plannerDepSelect.addEventListener('change', updateRouteCalculation);
  if (plannerArrSelect) plannerArrSelect.addEventListener('change', updateRouteCalculation);
  updateRouteCalculation();
}

/* -------------------------------------------------------------------------- */
/* 16. Phase 6: Rules & Deposit Protection Calculator Engine                 */
/* -------------------------------------------------------------------------- */
const protectionTiersData = {
  standard: {
    name: 'Standard Base Protection',
    deposit: '$0 Hold',
    dailyCost: 'Included ($0)',
    deductible: '$150 Maximum',
    theftCoverage: 'Covered with Police Report',
    roadside: 'Free 24/7 Hotline',
    damageWaiver: 'Wear & Tear Included',
    desc: 'Zero credit card hold. You are covered against normal wear and tear, chain slips, and puncture flats. In the rare event of total frame theft, your liability is strictly capped at $150.'
  },
  premium: {
    name: 'Premium Complete Shield',
    deposit: '$0 Hold',
    dailyCost: '+$5 / day',
    deductible: '$0 Deductible (Zero Liability)',
    theftCoverage: '100% Comprehensive Zero Excess',
    roadside: 'Priority 15-Min Van Dispatch',
    damageWaiver: 'Accidental Damage 100% Covered',
    desc: 'Total peace of mind. Zero deductible on accidental frame damage, lost keys, or bike theft. Includes priority roadside dispatch anywhere in the metropolitan area.'
  },
  cargo: {
    name: 'Family Cargo & Tandem Shield',
    deposit: '$0 Hold',
    dailyCost: '+$8 / day',
    deductible: '$0 Deductible',
    theftCoverage: 'Dual Rider & Child Passenger Cover',
    roadside: 'Family Replacement Van Guarantee',
    damageWaiver: 'Child Seat & Rain Canopy Included',
    desc: 'Tailored for families and double-rider expeditions. Covers accessories, child safety harnesses, rain covers, and includes immediate taxi vouchers if an issue arises.'
  }
};

function initRulesPage() {
  const tierBtns = document.querySelectorAll('.protection-tier-btn');
  const nameEl = document.getElementById('calc-tier-name');
  const depositEl = document.getElementById('calc-tier-deposit');
  const costEl = document.getElementById('calc-tier-cost');
  const deductibleEl = document.getElementById('calc-tier-deductible');
  const theftEl = document.getElementById('calc-tier-theft');
  const roadsideEl = document.getElementById('calc-tier-roadside');
  const descEl = document.getElementById('calc-tier-desc');

  if (!tierBtns.length) return;

  function selectProtectionTier(key) {
    const data = protectionTiersData[key];
    if (!data) return;

    tierBtns.forEach(b => {
      const isCurrent = b.dataset.tier === key;
      b.classList.toggle('active', isCurrent);
      b.classList.toggle('border-[#C8D62C]', isCurrent);
      b.classList.toggle('bg-[#C8D62C]', isCurrent);
      b.classList.toggle('text-[#171A18]', isCurrent);
    });

    if (nameEl) nameEl.textContent = data.name;
    if (depositEl) depositEl.textContent = data.deposit;
    if (costEl) costEl.textContent = data.dailyCost;
    if (deductibleEl) deductibleEl.textContent = data.deductible;
    if (theftEl) theftEl.textContent = data.theftCoverage;
    if (roadsideEl) roadsideEl.textContent = data.roadside;
    if (descEl) descEl.textContent = data.desc;
  }

  tierBtns.forEach(btn => {
    btn.addEventListener('click', () => selectProtectionTier(btn.dataset.tier));
  });
}

/* -------------------------------------------------------------------------- */
/* 17. Phase 7: Login & Rider Authentication Portal Engine                    */
/* -------------------------------------------------------------------------- */
function initLoginPage() {
  const authTabBtns = document.querySelectorAll('.auth-tab-btn');
  const signinForm = document.getElementById('auth-signin-form');
  const registerForm = document.getElementById('auth-register-form');

  const demoRiderBtn = document.getElementById('demo-login-rider-btn');
  const demoGuideBtn = document.getElementById('demo-login-guide-btn');
  const emailInput = document.getElementById('signin-email-input');
  const passwordInput = document.getElementById('signin-password-input');

  if (!signinForm && !registerForm) return;

  // Tab switching
  authTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.authTab;
      authTabBtns.forEach(b => {
        b.classList.remove('active', 'bg-[#C8D62C]', 'text-[#171A18]');
        b.classList.add('text-[#171A18]', 'dark:text-white');
      });
      btn.classList.add('active', 'bg-[#C8D62C]', 'text-[#171A18]');
      btn.classList.remove('text-[#171A18]', 'dark:text-white');

      if (tab === 'signin') {
        if (signinForm) signinForm.classList.remove('hidden');
        if (registerForm) registerForm.classList.add('hidden');
      } else {
        if (signinForm) signinForm.classList.add('hidden');
        if (registerForm) registerForm.classList.remove('hidden');
      }
    });
  });

  // Demo Login Presets
  if (demoRiderBtn) {
    demoRiderBtn.addEventListener('click', () => {
      if (emailInput) emailInput.value = 'alex.rider@velocity.ch';
      if (passwordInput) passwordInput.value = '••••••••••••';
      localStorage.setItem('velo_user', JSON.stringify({
        name: 'Alexandre Meyer',
        email: 'alex.rider@velocity.ch',
        tier: 'E-Mobility Pro Member',
        rides: 24,
        savedCo2: '14.2 kg'
      }));
      alert('Demo Rider Credentials Loaded! Opening Dashboard...');
      window.location.href = 'dashboard.html';
    });
  }

  if (demoGuideBtn) {
    demoGuideBtn.addEventListener('click', () => {
      if (emailInput) emailInput.value = 'guide.elena@velocity.ch';
      if (passwordInput) passwordInput.value = '••••••••••••';
      localStorage.setItem('velo_user', JSON.stringify({
        name: 'Dr. Elena Rossi',
        email: 'guide.elena@velocity.ch',
        tier: 'Certified Lead Tour Guide',
        rides: 180,
        savedCo2: '98.5 kg'
      }));
      alert('Demo Guide Credentials Loaded! Opening Guided Tours...');
      window.location.href = 'tours.html';
    });
  }

  // Handle Form Submissions
  if (signinForm) {
    signinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = emailInput ? emailInput.value : 'alex.rider@velocity.ch';
      localStorage.setItem('velo_user', JSON.stringify({
        name: email.split('@')[0] || 'Alexandre Meyer',
        email: email,
        tier: 'E-Mobility Pro Member',
        rides: 24,
        savedCo2: '14.2 kg'
      }));
      alert(`Welcome back! Authenticated as ${email}. Opening Dashboard...`);
      window.location.href = 'dashboard.html';
    });
  }

  // Password Visibility Toggle
  const togglePassBtn = document.getElementById('toggle-password-visibility-btn');
  const eyeOpen = document.getElementById('eye-icon-open');
  const eyeClosed = document.getElementById('eye-icon-closed');

  if (togglePassBtn && passwordInput) {
    togglePassBtn.addEventListener('click', () => {
      const isPass = passwordInput.type === 'password';
      passwordInput.type = isPass ? 'text' : 'password';
      if (eyeOpen && eyeClosed) {
        eyeOpen.classList.toggle('hidden', isPass);
        eyeClosed.classList.toggle('hidden', !isPass);
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Rider Account Created ($0 Deposit)! Opening Dashboard...');
      window.location.href = 'dashboard.html';
    });
  }
}

/* -------------------------------------------------------------------------- */
/* 18. Phase 8: Customer Dashboard & Active Rental Manager Engine             */
/* -------------------------------------------------------------------------- */
function initDashboardPage() {
  const timerHoursEl = document.getElementById('dash-timer-hours');
  const timerMinsEl = document.getElementById('dash-timer-mins');
  const timerSecsEl = document.getElementById('dash-timer-secs');
  const extendBtn = document.getElementById('dash-extend-rental-btn');
  const pauseBtn = document.getElementById('dash-pause-lock-btn');
  const returnBtn = document.getElementById('dash-return-dock-btn');
  const returnModal = document.getElementById('dash-return-modal');
  const closeReturnModalBtn = document.getElementById('close-return-modal-btn');
  const returnBackdrop = document.getElementById('return-modal-backdrop');

  const sidebarTabBtns = document.querySelectorAll('.dash-sidebar-btn');
  const dashPanels = document.querySelectorAll('.dash-content-panel');

  // Header Profile Dropdown Controls
  const headerProfileBtn = document.getElementById('dash-header-profile-btn');
  const headerProfileDropdown = document.getElementById('dash-header-profile-dropdown');
  const profileChevron = document.getElementById('dash-profile-chevron');

  function toggleProfileDropdown() {
    if (!headerProfileDropdown) return;
    const isClosed = headerProfileDropdown.classList.contains('opacity-0');
    if (isClosed) {
      headerProfileDropdown.classList.remove('opacity-0', 'scale-95', 'pointer-events-none');
      headerProfileDropdown.classList.add('opacity-100', 'scale-100', 'pointer-events-auto');
      if (headerProfileBtn) headerProfileBtn.setAttribute('aria-expanded', 'true');
      if (profileChevron) profileChevron.classList.add('rotate-180');
    } else {
      closeProfileDropdown();
    }
  }

  function closeProfileDropdown() {
    if (!headerProfileDropdown) return;
    headerProfileDropdown.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
    headerProfileDropdown.classList.remove('opacity-100', 'scale-100', 'pointer-events-auto');
    if (headerProfileBtn) headerProfileBtn.setAttribute('aria-expanded', 'false');
    if (profileChevron) profileChevron.classList.remove('rotate-180');
  }

  if (headerProfileBtn) {
    headerProfileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleProfileDropdown();
    });
  }

  document.addEventListener('click', (e) => {
    if (headerProfileDropdown && !headerProfileDropdown.contains(e.target) && (!headerProfileBtn || !headerProfileBtn.contains(e.target))) {
      closeProfileDropdown();
    }
  });

  // Mobile Sidebar Drawer Controls
  const sidebarOpenBtn = document.getElementById('dash-sidebar-open-btn');
  const sidebarCloseBtn = document.getElementById('dash-sidebar-close-btn');
  const sidebarEl = document.getElementById('dash-sidebar');
  const sidebarBackdrop = document.getElementById('dash-sidebar-backdrop');

  function openSidebar() {
    if (sidebarEl && sidebarBackdrop) {
      sidebarEl.classList.remove('translate-x-full');
      sidebarEl.classList.add('translate-x-0');
      sidebarBackdrop.classList.remove('opacity-0', 'pointer-events-none');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeSidebar() {
    if (sidebarEl && sidebarBackdrop) {
      sidebarEl.classList.add('translate-x-full');
      sidebarEl.classList.remove('translate-x-0');
      sidebarBackdrop.classList.add('opacity-0', 'pointer-events-none');
      document.body.style.overflow = '';
    }
  }

  if (sidebarOpenBtn) sidebarOpenBtn.addEventListener('click', openSidebar);
  if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', closeSidebar);
  if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', closeSidebar);

  // Sidebar & Dropdown Tab Navigation
  sidebarTabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const tabTarget = btn.dataset.tab;
      if (!tabTarget) return;

      if (tabTarget === 'logout') {
        e.preventDefault();
        closeProfileDropdown();
        localStorage.removeItem('velo_user');
        alert('Signing out of Rider Portal...');
        window.location.href = 'login.html';
        return;
      }

      e.preventDefault();
      closeProfileDropdown();
      sidebarTabBtns.forEach(b => {
        b.classList.remove('active', 'bg-[#C8D62C]', 'text-[#171A18]', 'font-bold', 'shadow-sm');
        b.classList.add('text-[#171A18]', 'dark:text-white', 'hover:bg-[#F7F7F2]', 'dark:hover:bg-white/5');
      });

      // Highlight all matching buttons (desktop + mobile drawer)
      document.querySelectorAll(`.dash-sidebar-btn[data-tab="${tabTarget}"]`).forEach(b => {
        b.classList.add('active', 'bg-[#C8D62C]', 'text-[#171A18]', 'font-bold', 'shadow-sm');
        b.classList.remove('text-[#171A18]', 'dark:text-white', 'hover:bg-[#F7F7F2]', 'dark:hover:bg-white/5');
      });

      dashPanels.forEach(panel => {
        if (panel.id === `dash-panel-${tabTarget}`) {
          panel.classList.remove('hidden');
        } else {
          panel.classList.add('hidden');
        }
      });

      closeSidebar();
      const dashScrollContainer = document.getElementById('dash-main-scroll-container');
      if (dashScrollContainer) {
        dashScrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  if (!timerSecsEl) return;

  // Live Timer Ticking Engine (Elapsed ride time)
  let totalElapsedSeconds = 1 * 3600 + 42 * 60 + 15; // 01h 42m 15s

  function updateTimerDisplay() {
    totalElapsedSeconds++;
    const h = Math.floor(totalElapsedSeconds / 3600);
    const m = Math.floor((totalElapsedSeconds % 3600) / 60);
    const s = totalElapsedSeconds % 60;

    if (timerHoursEl) timerHoursEl.textContent = String(h).padStart(2, '0');
    if (timerMinsEl) timerMinsEl.textContent = String(m).padStart(2, '0');
    if (timerSecsEl) timerSecsEl.textContent = String(s).padStart(2, '0');
  }

  setInterval(updateTimerDisplay, 1000);

  // 1-Tap Rental Extension
  if (extendBtn) {
    extendBtn.addEventListener('click', () => {
      totalElapsedSeconds += 3600; // Add 1 hour
      alert('Rental Extended by +1 Hour ($4.00 billed to monthly invoice). New return window updated.');
    });
  }

  // Remote Pause Lock
  let isPaused = false;
  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      isPaused = !isPaused;
      if (isPaused) {
        pauseBtn.classList.add('bg-amber-500', 'text-white');
        pauseBtn.innerHTML = `
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <span>ABUS Lock Engaged (Tap to Resume)</span>
        `;
        alert('ABUS Smart Lock Locked. Bicycle immobilized securely while you visit.');
      } else {
        pauseBtn.classList.remove('bg-amber-500', 'text-white');
        pauseBtn.innerHTML = `
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>
          <span>Pause Ride &amp; Engage ABUS Lock</span>
        `;
        alert('ABUS Smart Lock Unlocked. Ready to continue your ride!');
      }
    });
  }

  // Return to Dock Modal Handlers
  function openReturnModal() {
    if (returnModal) {
      returnModal.classList.remove('opacity-0', 'pointer-events-none');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeReturnModal() {
    if (returnModal) {
      returnModal.classList.add('opacity-0', 'pointer-events-none');
      document.body.style.overflow = '';
    }
  }

  if (returnBtn) returnBtn.addEventListener('click', openReturnModal);
  if (closeReturnModalBtn) closeReturnModalBtn.addEventListener('click', closeReturnModal);
  if (returnBackdrop) returnBackdrop.addEventListener('click', closeReturnModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && returnModal && !returnModal.classList.contains('pointer-events-none')) {
      closeReturnModal();
    }
  });
}

/* -------------------------------------------------------------------------- */
/* 19. Phase 9: Contact & 24/7 Roadside Concierge Engine                      */
/* -------------------------------------------------------------------------- */
function initContactPage() {
  const dispatchForm = document.getElementById('roadside-dispatch-form');
  const groupForm = document.getElementById('corporate-group-form');

  if (dispatchForm) {
    dispatchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const station = document.getElementById('dispatch-station-select')?.value || 'Central Station';
      const issue = document.getElementById('dispatch-issue-select')?.value || 'Puncture';
      alert(`🚨 Mobile Service Van Dispatched to ${station}! Incident: ${issue}. Estimated Arrival: 12-15 minutes.`);
    });
  }

  if (groupForm) {
    groupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('🏢 Corporate Group Request Received! Our Mobility Concierge will email your custom proposal within 2 business hours.');
    });
  }

  // Google Maps Hub Interactive Switcher
  const mapData = {
    central: {
      name: "Central Railway Station Mega-Hub",
      badge: "MAIN URBAN WORKSHOP • 24/7 DOCKS",
      address: "Bahnhofplatz 1, Sector A (Track 18), 8001 Zürich",
      hours: "Mon – Sun: 07:00 – 22:00 (Attended) • Docks 24/7",
      phone: "+41 44 215 5001",
      features: "Master Mechanics • Keyless NFC • Battery Swap",
      embedQuery: "Bahnhofplatz+1,+8001+Z%C3%BCrich,+Switzerland",
      directionsQuery: "Bahnhofplatz+1,+8001+Z%C3%BCrich,+Switzerland"
    },
    oldtown: {
      name: "Historic Old Town Plaza Hub",
      badge: "GUIDED TOUR DEPARTURE & LOCKERS",
      address: "Münsterhof 8, Cathedral Cloister, 8001 Zürich",
      hours: "Mon – Sun: 08:00 – 20:00 (Attended) • Docks 24/7",
      phone: "+41 44 215 5002",
      features: "Whisper Headsets • Luggage Lockers • Tour Check-In",
      embedQuery: "M%C3%BCnsterhof+8,+8001+Z%C3%BCrich,+Switzerland",
      directionsQuery: "M%C3%BCnsterhof+8,+8001+Z%C3%BCrich,+Switzerland"
    },
    marina: {
      name: "Waterfront Marina Hub",
      badge: "TANDEM & WATERFRONT DEPOT",
      address: "Seestrasse 44, Marina Pier 3, 8002 Zürich",
      hours: "Mon – Sun: 08:00 – 21:00 (Attended) • Docks 24/7",
      phone: "+41 44 215 5003",
      features: "Solar Fast-Charger • Tandem Specialists • Lake Views",
      embedQuery: "Seestrasse+44,+8002+Z%C3%BCrich,+Switzerland",
      directionsQuery: "Seestrasse+44,+8002+Z%C3%BCrich,+Switzerland"
    },
    university: {
      name: "ETH University Campus Hub",
      badge: "ACADEMIC & RESEARCH DISTRICT",
      address: "Rämistrasse 101, Main Polyterrasse, 8092 Zürich",
      hours: "Mon – Sun: 06:00 – 23:00 • Fast Solar Docking",
      phone: "+41 44 215 5004",
      features: "Student Pass Validation • E-Boost Charging • Express Lockers",
      embedQuery: "R%C3%A4mistrasse+101,+8092+Z%C3%BCrich,+Switzerland",
      directionsQuery: "R%C3%A4mistrasse+101,+8092+Z%C3%BCrich,+Switzerland"
    },
    headquarters: {
      name: "Velo City Global Headquarters",
      badge: "CORPORATE & CONCIERGE DESK",
      address: "Bahnhofstrasse 42, 8001 Zürich, Switzerland",
      hours: "Mon – Fri: 08:30 – 18:30 • Sat: 09:00 – 17:00",
      phone: "+41 44 215 5000",
      features: "Fleet Leasing Desk • VIP Concierge • Press & Partnerships",
      embedQuery: "Bahnhofstrasse+42,+8001+Z%C3%BCrich,+Switzerland",
      directionsQuery: "Bahnhofstrasse+42,+8001+Z%C3%BCrich,+Switzerland"
    }
  };

  const mapIframe = document.getElementById('contact-google-map-iframe');
  const hubBtns = document.querySelectorAll('.contact-map-hub-btn');
  const badgeEl = document.getElementById('map-hub-badge');
  const titleEl = document.getElementById('map-hub-title');
  const addressEl = document.getElementById('map-hub-address');
  const hoursEl = document.getElementById('map-hub-hours');
  const phoneEl = document.getElementById('map-hub-phone');
  const featuresEl = document.getElementById('map-hub-features');
  const directionsBtn = document.getElementById('map-hub-directions-btn');
  const callBtn = document.getElementById('map-hub-call-btn');

  hubBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const hubKey = btn.dataset.mapHub;
      const hub = mapData[hubKey];
      if (!hub) return;

      // Update active button styling
      hubBtns.forEach(b => {
        b.classList.remove('active', 'bg-[#C8D62C]', 'text-[#171A18]', 'shadow-sm');
        b.classList.add('border', 'border-[#D9DDD8]', 'dark:border-white/20', 'text-[#171A18]', 'dark:text-white');
      });
      btn.classList.add('active', 'bg-[#C8D62C]', 'text-[#171A18]', 'shadow-sm');
      btn.classList.remove('border-[#D9DDD8]', 'dark:border-white/20');

      // Update map iframe src
      if (mapIframe) {
        mapIframe.src = `https://maps.google.com/maps?q=${hub.embedQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
      }

      // Update card contents
      if (badgeEl) badgeEl.textContent = hub.badge;
      if (titleEl) titleEl.textContent = hub.name;
      if (addressEl) addressEl.textContent = hub.address;
      if (hoursEl) hoursEl.textContent = hub.hours;
      if (phoneEl) {
        phoneEl.textContent = hub.phone;
        phoneEl.href = `tel:${hub.phone.replace(/\s+/g, '')}`;
      }
      if (featuresEl) featuresEl.textContent = hub.features;
      if (directionsBtn) {
        directionsBtn.href = `https://maps.google.com/?q=${hub.directionsQuery}`;
      }
      if (callBtn) {
        callBtn.href = `tel:${hub.phone.replace(/\s+/g, '')}`;
      }
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 20. FAQ Accordion Handler                                                  */
/* -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqButtons = document.querySelectorAll('.faq-accordion-btn');
  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const panel = btn.nextElementSibling;
      const icon = btn.querySelector('.faq-icon');
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      const parent = btn.closest('.faq-container');
      if (parent) {
        parent.querySelectorAll('.faq-accordion-btn').forEach(otherBtn => {
          if (otherBtn !== btn) {
            otherBtn.setAttribute('aria-expanded', 'false');
            if (otherBtn.nextElementSibling) otherBtn.nextElementSibling.classList.add('hidden');
            const otherIcon = otherBtn.querySelector('.faq-icon');
            if (otherIcon) otherIcon.classList.remove('rotate-180');
          }
        });
      }

      if (isExpanded) {
        btn.setAttribute('aria-expanded', 'false');
        if (panel) panel.classList.add('hidden');
        if (icon) icon.classList.remove('rotate-180');
      } else {
        btn.setAttribute('aria-expanded', 'true');
        if (panel) panel.classList.remove('hidden');
        if (icon) icon.classList.add('rotate-180');
      }
    });
  });
}







document.addEventListener("DOMContentLoaded", () => {

  const animatedElements = document.querySelectorAll(
    "#tours-section .tour-eyebrow, \
     #tours-section .tour-title, \
     #tours-section .tour-meta, \
     #tours-section .tour-stage, \
     #tours-section .tour-small-title, \
     #tours-section .tour-main-copy, \
     #tours-section .tour-bottom, \
     #tours-section .tour-dot, \
     #tours-section .tour-vertical-text"
  );


  /* ==========================================================
     SCROLL REVEAL
  ========================================================== */

  const observer = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("is-visible");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.15
    }
  );


  animatedElements.forEach((element) => {
    observer.observe(element);
  });



  /* ==========================================================
     MOUSE PARALLAX
  ========================================================== */

  const stage = document.querySelector(".tour-stage");
  const image = document.querySelector(".tour-image");

  if (stage && image) {

    stage.addEventListener("mousemove", (event) => {

      const rect = stage.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) / rect.width - 0.5;

      const y =
        (event.clientY - rect.top) / rect.height - 0.5;

      image.style.transform =
        `scale(1.045)
         translate(${x * -12}px, ${y * -12}px)`;

    });


    stage.addEventListener("mouseleave", () => {

      image.style.transform =
        "scale(1) translate(0,0)";

    });

  }

});



// <!-- ===================================================================== -->
// <!-- JAVASCRIPT -->
// <!-- ===================================================================== -->



document.addEventListener("DOMContentLoaded", () => {

  const section =
    document.querySelector("#how-it-works");

  if (!section) return;


  /* ================================================================ */
  /* REVEAL */
  /* ================================================================ */

  const revealItems =
    section.querySelectorAll(
      ".ride-header, .timer-wrapper, .ride-side-left, .ride-side-right"
    );


  const revealObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) return;

          entry.target.classList.add(
            "is-visible"
          );

          revealObserver.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: 0.12
      }
    );


  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });



  /* ================================================================ */
  /* STEP DATA */
  /* ================================================================ */

  const steps = [

    {
      number: "01",

      label: "Choose",

      title: "Select Model",

      description:
        "Choose your ideal bicycle from city cruisers, Bosch e-bikes or tandems. Compare the ride style, range and comfort before starting.",

      meta:
        "City Cruiser · E-Bike · Tandem",

      seconds: 60
    },


    {
      number: "02",

      label: "Connect",

      title: "Instant QR Pass",

      description:
        "Your digital ride pass arrives directly on your phone. No printed ticket, no counter queue and no deposit hold.",

      meta:
        "Digital Access · Zero Paper · Zero Deposit",

      seconds: 45
    },


    {
      number: "03",

      label: "Unlock",

      title: "2-Second Unlock",

      description:
        "Reach any smart docking station, scan your QR pass and the electromagnetic lock releases almost instantly. Your ride is ready.",

      meta:
        "24 Smart Stations · 2 Sec Unlock",

      seconds: 30
    },


    {
      number: "04",

      label: "Finish",

      title: "Return Anywhere",

      description:
        "Dock the bicycle at any available station when your journey is complete. The system closes your rental and generates your receipt automatically.",

      meta:
        "Flexible Return · Auto Receipt",

      seconds: 15
    }

  ];



  /* ================================================================ */
  /* ELEMENTS */
  /* ================================================================ */

  const buttons =
    section.querySelectorAll(
      ".ride-step-button"
    );

  const number =
    section.querySelector(
      "#activeStepNumber"
    );

  const label =
    section.querySelector(
      "#activeStepLabel"
    );

  const title =
    section.querySelector(
      "#activeStepTitle"
    );

  const description =
    section.querySelector(
      "#activeStepDescription"
    );

  const meta =
    section.querySelector(
      "#activeStepMeta"
    );

  const timer =
    section.querySelector(
      "#timerNumber"
    );

  const progress =
    section.querySelector(
      "#progressCircle"
    );


  let currentStep = 0;
  let autoPlay;



  /* ================================================================ */
  /* UPDATE STEP */
  /* ================================================================ */

  function updateStep(index) {

    currentStep = index;

    const step =
      steps[index];


    /* Button */

    buttons.forEach(
      (button, buttonIndex) => {

        button.classList.toggle(
          "active",
          buttonIndex === index
        );

      }
    );


    /* Animate */

    [
      number,
      label,
      title,
      description,
      meta,
      timer
    ].forEach((element) => {

      if (!element) return;

      element.classList.remove(
        "step-content-change"
      );

      void element.offsetWidth;

      element.classList.add(
        "step-content-change"
      );

    });


    /* Content */

    number.textContent =
      step.number;

    label.textContent =
      step.label;

    title.textContent =
      step.title;

    description.textContent =
      step.description;

    meta.textContent =
      step.meta;

    timer.textContent =
      step.seconds;


    /* Progress */

    const circumference =
      1288;

    const percentage =
      (index + 1) / steps.length;

    const offset =
      circumference -
      circumference * percentage;

    progress.style.strokeDashoffset =
      offset;

  }



  /* ================================================================ */
  /* BUTTON CLICK */
  /* ================================================================ */

  buttons.forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        updateStep(
          Number(button.dataset.step)
        );

        restartAutoPlay();

      }
    );

  });



  /* ================================================================ */
  /* AUTO PLAY */
  /* ================================================================ */

  function startAutoPlay() {

    autoPlay =
      setInterval(() => {

        let next =
          currentStep + 1;

        if (next >= steps.length) {
          next = 0;
        }

        updateStep(next);

      }, 3500);

  }


  function restartAutoPlay() {

    clearInterval(autoPlay);

    startAutoPlay();

  }



  /* ================================================================ */
  /* INITIAL */
  /* ================================================================ */

  updateStep(0);

  startAutoPlay();



  /* ================================================================ */
  /* PAUSE TAB */
  /* ================================================================ */

  document.addEventListener(
    "visibilitychange",
    () => {

      if (document.hidden) {

        clearInterval(autoPlay);

      } else {

        restartAutoPlay();

      }

    }
  );

});



// <!-- ===================================================================== -->
// <!-- SECTION 6 JAVASCRIPT                                                   -->
// <!-- ===================================================================== -->



document.addEventListener("DOMContentLoaded", () => {

  const section =
    document.querySelector("#locations-section");

  if (!section) return;


  /* ================================================================ */
  /* STATION DATA */
  /* ================================================================ */

  const stations = {

    central: {

      title:
        "Central Railway Station Hub",

      address:
        "Bahnhofplatz 1, Sector A · Track 18 Exit",

      bikes:
        "42",

      docks:
        "18",

      hours:
        "Open 24/7",

      walk:
        "2 min walk",

      transit:
        "Metro 1 · 2 · 4",

      support:
        "07:00 — 22:00",

      city:
        45,

      ebike:
        35,

      tandem:
        20

    },


    oldtown: {

      title:
        "Old Town Mobility Hub",

      address:
        "Marktplatz 8 · Historic District",

      bikes:
        "27",

      docks:
        "11",

      hours:
        "Open 24/7",

      walk:
        "1 min walk",

      transit:
        "Tram 3 · Bus 8",

      support:
        "08:00 — 21:00",

      city:
        55,

      ebike:
        25,

      tandem:
        20

    },


    waterfront: {

      title:
        "Waterfront Promenade Hub",

      address:
        "Riverside Avenue 24 · Pier Entrance",

      bikes:
        "36",

      docks:
        "22",

      hours:
        "Open 24/7",

      walk:
        "3 min walk",

      transit:
        "Metro 2 · Ferry",

      support:
        "07:00 — 22:00",

      city:
        35,

      ebike:
        50,

      tandem:
        15

    },


    university: {

      title:
        "University Green Hub",

      address:
        "Campus Avenue 12 · Main Gate",

      bikes:
        "31",

      docks:
        "16",

      hours:
        "Open 24/7",

      walk:
        "2 min walk",

      transit:
        "Metro 4 · Bus 12",

      support:
        "07:00 — 22:00",

      city:
        40,

      ebike:
        45,

      tandem:
        15

    },


    market: {

      title:
        "Market Square Hub",

      address:
        "Central Market Road · East Entrance",

      bikes:
        "23",

      docks:
        "14",

      hours:
        "Open 24/7",

      walk:
        "2 min walk",

      transit:
        "Tram 1 · Bus 6",

      support:
        "08:00 — 21:00",

      city:
        60,

      ebike:
        25,

      tandem:
        15

    },


    park: {

      title:
        "Riverside Park Hub",

      address:
        "Greenway Boulevard · Park Gate",

      bikes:
        "27",

      docks:
        "19",

      hours:
        "Open 24/7",

      walk:
        "4 min walk",

      transit:
        "Bus 5 · Cycleway",

      support:
        "07:00 — 22:00",

      city:
        30,

      ebike:
        50,

      tandem:
        20

    }

  };



  /* ================================================================ */
  /* ELEMENTS */
  /* ================================================================ */

  const hotspots =
    section.querySelectorAll(
      ".map-hotspot"
    );

  const title =
    section.querySelector(
      "#station-info-title"
    );

  const address =
    section.querySelector(
      "#station-info-address"
    );

  const bikes =
    section.querySelector(
      "#station-info-bikes"
    );

  const docks =
    section.querySelector(
      "#station-info-docks"
    );

  const hours =
    section.querySelector(
      "#station-info-hours"
    );

  const walk =
    section.querySelector(
      "#station-info-walk"
    );

  const transit =
    section.querySelector(
      "#station-info-transit"
    );

  const support =
    section.querySelector(
      "#station-info-support"
    );

  const city =
    section.querySelector(
      "#bike-city"
    );

  const ebike =
    section.querySelector(
      "#bike-ebike"
    );

  const tandem =
    section.querySelector(
      "#bike-tandem"
    );



  /* ================================================================ */
  /* UPDATE STATION */
  /* ================================================================ */

  function updateStation(key) {

    const station =
      stations[key];

    if (!station) return;


    /* Active hotspot */

    hotspots.forEach((hotspot) => {

      hotspot.classList.toggle(
        "active",
        hotspot.dataset.station === key
      );

    });


    /* Animate */

    [
      title,
      address,
      bikes,
      docks,
      hours,
      walk,
      transit,
      support
    ].forEach((element) => {

      if (!element) return;

      element.classList.remove(
        "station-changing"
      );

      void element.offsetWidth;

      element.classList.add(
        "station-changing"
      );

    });


    /* Update */

    title.textContent =
      station.title;

    address.textContent =
      station.address;

    bikes.textContent =
      station.bikes;

    docks.textContent =
      station.docks;

    hours.textContent =
      station.hours;

    walk.textContent =
      station.walk;

    transit.textContent =
      station.transit;

    support.textContent =
      station.support;


    /* Bike mix */

    city.style.width =
      station.city + "%";

    ebike.style.width =
      station.ebike + "%";

    tandem.style.width =
      station.tandem + "%";

  }



  /* ================================================================ */
  /* CLICK EVENTS */
  /* ================================================================ */

  hotspots.forEach((hotspot) => {

    hotspot.addEventListener(
      "click",
      () => {

        updateStation(
          hotspot.dataset.station
        );

      }
    );

  });



  /* ================================================================ */
  /* UPDATE TIME */
  /* ================================================================ */

  const updateTime =
    section.querySelector(
      "#map-update-time"
    );

  if (updateTime) {

    updateTime.textContent =
      new Date().toLocaleTimeString(
        [],
        {
          hour: "2-digit",
          minute: "2-digit"
        }
      );

  }


  /* Initial */

  updateStation("central");

});



// <!-- ======================================================================= -->
// <!-- SECTION 4 — JAVASCRIPT                                                  -->
// <!-- ======================================================================= -->



document.addEventListener("DOMContentLoaded", function () {


  /* ==============================================================
     EXPERIENCE SECTION
  ============================================================== */

  const section =
    document.querySelector("#experience");

  if (!section) return;



  /* ==============================================================
     SCROLL REVEAL
  ============================================================== */

  const revealItems =
    section.querySelectorAll(
      ".reveal-experience"
    );


  const revealObserver =
    new IntersectionObserver(

      function (entries) {

        entries.forEach(function (entry) {

          if (!entry.isIntersecting) return;


          entry.target.classList.add(
            "is-visible"
          );


          revealObserver.unobserve(
            entry.target
          );

        });

      },

      {
        threshold:0.08,
        rootMargin:"0px 0px -40px 0px"
      }

    );


  revealItems.forEach(function (item) {

    revealObserver.observe(item);

  });



  /* ==============================================================
     MOUSE PARALLAX YEAR
  ============================================================== */

  const rows =
    section.querySelectorAll(
      ".experience-row"
    );


  rows.forEach(function (row) {

    const year =
      row.querySelector(
        ".experience-year"
      );


    row.addEventListener(
      "mousemove",
      function (event) {

        if (window.innerWidth < 768) return;

        const rect =
          row.getBoundingClientRect();


        const mouseX =
          event.clientX -
          rect.left;


        const mouseY =
          event.clientY -
          rect.top;


        const x =
          ((mouseX / rect.width) - .5) * 10;


        const y =
          ((mouseY / rect.height) - .5) * 6;


        if (year) {

          year.style.transform =
            `translate(${x * -1}px, ${y}px) scale(1.1)`;

        }

      }
    );


    row.addEventListener(
      "mouseleave",
      function () {

        if (!year) return;

        year.style.transform = "";

      }
    );

  });



  /* ==============================================================
     ACTIVE YEAR
  ============================================================== */

  const timelineRows =
    Array.from(
      section.querySelectorAll(
        ".experience-row"
      )
    );


  function updateActiveYear() {

    if (!timelineRows.length) return;


    const viewportCenter =
      window.innerHeight * .5;


    let closestRow = null;

    let closestDistance =
      Infinity;


    timelineRows.forEach(
      function (row) {

        const rect =
          row.getBoundingClientRect();


        const rowCenter =
          rect.top +
          rect.height / 2;


        const distance =
          Math.abs(
            viewportCenter -
            rowCenter
          );


        if (
          distance <
          closestDistance
        ) {

          closestDistance =
            distance;

          closestRow =
            row;

        }

      }
    );


    timelineRows.forEach(
      function (row) {

        row.classList.remove(
          "year-active"
        );

      }
    );


    if (closestRow) {

      closestRow.classList.add(
        "year-active"
      );

    }

  }


  window.addEventListener(
    "scroll",
    updateActiveYear,
    {
      passive:true
    }
  );


  updateActiveYear();



  /* ==============================================================
     NUMBER COUNTER
  ============================================================== */

  const counters =
    section.querySelectorAll(
      ".experience-counter"
    );


  let counterStarted =
    false;


  const counterObserver =
    new IntersectionObserver(

      function (entries) {

        entries.forEach(
          function (entry) {

            if (
              !entry.isIntersecting ||
              counterStarted
            ) return;


            counterStarted = true;


            counters.forEach(
              function (counter) {

                const target =
                  parseInt(
                    counter.dataset.count,
                    10
                  );


                if (isNaN(target))
                  return;


                const original =
                  counter.textContent
                    .trim();


                let suffix = "";


                if (
                  original.includes("+")
                ) {

                  suffix = "+";

                }
                else if (
                  original.includes("%")
                ) {

                  suffix = "%";

                }


                let current = 0;

                const duration = 1100;

                const start =
                  performance.now();


                function animate(
                  now
                ) {

                  const progress =
                    Math.min(
                      (now - start) /
                      duration,
                      1
                    );


                  const eased =
                    1 -
                    Math.pow(
                      1 - progress,
                      3
                    );


                  current =
                    Math.floor(
                      target * eased
                    );


                  let value =
                    String(current);


                  if (target < 10) {

                    value =
                      value.padStart(
                        2,
                        "0"
                      );

                  }


                  counter.textContent =
                    value + suffix;


                  if (
                    progress < 1
                  ) {

                    requestAnimationFrame(
                      animate
                    );

                  }

                }


                requestAnimationFrame(
                  animate
                );

              }
            );


            counterObserver.disconnect();

          }
        );

      },

      {
        threshold:.3
      }

    );


  counters.forEach(
    function (counter) {

      counterObserver.observe(
        counter
      );

    }
  );

});

// <!-- ======================================================================= -->
// <!-- SECTION 5 — TRAIL DATA + INTERACTION                                   -->
// <!-- ======================================================================= -->


// End of Trail Interaction



// <!-- ======================================================================= -->
// <!-- SECTION 8 — REVEAL SCRIPT                                               -->
// <!-- ======================================================================= -->


document.addEventListener("DOMContentLoaded", () => {

  const elements =
    document.querySelectorAll(".manifesto-reveal");

  const observer =
    new IntersectionObserver(
      (entries, obs) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            obs.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.15
      }
    );

  elements.forEach(element => {
    observer.observe(element);
  });

});

// <!-- ======================================================================= -->
// <!-- JAVASCRIPT                                                              -->
// <!-- ======================================================================= -->



document.addEventListener("DOMContentLoaded", () => {

  const section = document.getElementById("gear-bench");

  if (!section) return;


  /* ---------------------------------------------------------
     SCROLL REVEAL
  --------------------------------------------------------- */

  const revealItems =
    section.querySelectorAll(".gear-reveal");

  const revealObserver =
    new IntersectionObserver((entries, observer) => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");

        observer.unobserve(entry.target);

      });

    }, {
      threshold: 0.12
    });


  revealItems.forEach(item => {
    revealObserver.observe(item);
  });


  /* ---------------------------------------------------------
     EQUIPMENT SWITCHER
  --------------------------------------------------------- */

  const buttons =
    section.querySelectorAll(".gear-select");

  const image =
    document.getElementById("gearImage");

  const visualTitle =
    document.getElementById("gearVisualTitle");

  const category =
    document.getElementById("gearCategory");

  const description =
    document.getElementById("gearDescription");


  buttons.forEach(button => {

    button.addEventListener("click", () => {

      buttons.forEach(item => {
        item.classList.remove("active");
      });

      button.classList.add("active");


      const name =
        button.dataset.name;

      const type =
        button.dataset.category;

      const text =
        button.dataset.description;

      const newImage =
        button.dataset.image;


      /* Image transition */

      image.classList.add("changing");


      setTimeout(() => {

        image.src = newImage;
        image.alt = name;

        visualTitle.textContent = name;
        category.textContent = type;
        description.textContent = text;

        image.classList.remove("changing");

      }, 260);

    });

  });

});




// <!-- ======================================================================= -->
// <!-- SECTION 4 — JAVASCRIPT                                                  -->
// <!-- ======================================================================= -->


document.addEventListener("DOMContentLoaded", () => {

  const section =
    document.getElementById("equipment-blueprint");

  if (!section) return;

  const items =
    section.querySelectorAll(".blueprint-reveal");


  const observer =
    new IntersectionObserver(
      (entries, obs) => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");

          obs.unobserve(entry.target);

        });

      },
      {
        threshold: 0.12
      }
    );


  items.forEach(item => {
    observer.observe(item);
  });

});




// <!-- =========================================================
//      SECTION 5 JAVASCRIPT
// ========================================================= -->


document.addEventListener("DOMContentLoaded", () => {

  const revealElements =
    document.querySelectorAll(".ride-reveal");

  const ridePanel =
    document.querySelector(".ride-panel");


  /* =========================================
     SCROLL REVEAL
  ========================================== */

  const revealObserver = new IntersectionObserver(

    (entries) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) return;

        entry.target.classList.add("ride-visible");

        if (
          entry.target.classList.contains("ride-panel")
        ) {

          entry.target.classList.add(
            "ride-panel-visible"
          );

        }

        revealObserver.unobserve(entry.target);

      });

    },

    {
      threshold: 0.12,
      rootMargin: "0px 0px -50px 0px"
    }

  );


  revealElements.forEach((element) => {

    revealObserver.observe(element);

  });


  if (ridePanel) {

    revealObserver.observe(ridePanel);

  }


  /* =========================================
     SUBTLE MOUSE PARALLAX
  ========================================== */

  const panel =
    document.querySelector(".ride-panel");

  const glowOne =
    document.querySelector(".ride-glow-one");

  const glowTwo =
    document.querySelector(".ride-glow-two");


  if (
    panel &&
    window.matchMedia("(pointer:fine)").matches
  ) {

    panel.addEventListener("mousemove", (event) => {

      const rect =
        panel.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) /
        rect.width - 0.5;

      const y =
        (event.clientY - rect.top) /
        rect.height - 0.5;


      if (glowOne) {

        glowOne.style.transform =
          `translate(${x * 18}px, ${y * 18}px)`;

      }


      if (glowTwo) {

        glowTwo.style.transform =
          `translate(${x * -12}px, ${y * -12}px)`;

      }

    });


    panel.addEventListener("mouseleave", () => {

      if (glowOne) {

        glowOne.style.transform =
          "translate(0,0)";

      }


      if (glowTwo) {

        glowTwo.style.transform =
          "translate(0,0)";

      }

    });

  }

});


// <!-- =========================================================
//      SECTION 6 JAVASCRIPT
// ========================================================= -->


  document.addEventListener("DOMContentLoaded", () => {

    const rhythmItems =
      document.querySelectorAll(".reveal-rhythm");

    const rhythmObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              const delay =
                entry.target.dataset.delay || 0;

              setTimeout(() => {
                entry.target.classList.add("is-visible");
              }, delay);

              rhythmObserver.unobserve(entry.target);

            }

          });

        },
        {
          threshold: 0.12
        }
      );


    rhythmItems.forEach((item, index) => {

      item.dataset.delay = index * 100;

      rhythmObserver.observe(item);

    });

  });

