# VELO CITY — Premium Bicycle Rental & City Tour Service

> **Phase 1 — Home 1 Only**: Client-ready, responsive, editorial single-page experience for an urban mobility and guided cycling tour brand.

---

## 🚲 Project Overview

**VELO CITY** delivers an experiential urban mobility platform offering city cruisers, high-performance e-bikes, duo tandem bikes, and expert-led architectural tours across a 24-station smart pickup network.

### ✨ Key Design Highlights
- **Editorial Non-Card Layouts**: Every section features a distinct visual treatment—asymmetric hero, photo-story narrative, interactive spec inspector, SVG polyline route highlight, connected horizontal timeline, interactive vector station map, oversized typography trust metrics, and full-bleed conversion banner.
- **Single-Line Desktop Navigation**: Desktop header is locked into a single horizontal row across `1024px`, `1280px`, `1440px`, and `1600px+`.
- **Pure Black Dark Mode (`#000000`)**: Complete high-contrast color tokens synced with `localStorage`.
- **Bidirectional Support (LTR / RTL)**: Dynamic direction toggling with `dir="rtl"`, mirrored icons, and flipped alignments.
- **Local High-Resolution Imagery**: Authentic urban cycling and fleet photography saved directly within `assets/images/`.
- **Zero Horizontal Overflow**: Fluid typography and strict responsive boundary rules across mobile, tablet, laptop, and ultra-wide displays.

---

## 📁 File Structure

```text
bicycle-rental/
├── index.html                  # Main Phase 1 Home 1 page
├── assets/
│   ├── css/
│   │   └── style.css           # Custom design tokens, typography, dark mode & animations
│   ├── js/
│   │   └── main.js             # Theme toggle, RTL toggle, mobile menu, fleet & map interactivity, counters
│   └── images/
│       ├── hero/
│       │   └── hero-city-cyclist.jpg
│       ├── fleet/
│       │   ├── city-cruiser.jpg
│       │   ├── e-commuter.jpg
│       │   └── tandem-urban.jpg
│       ├── tours/
│       │   └── guided-architecture-tour.jpg
│       ├── locations/
│       │   ├── station-central.jpg
│       │   ├── old-town.jpg
│       │   └── waterfront-promenade.jpg
│       └── sections/
│           ├── cycling-lifestyle.jpg
│           └── cta-sunset-ride.jpg
└── README.md
```

---

## 🛠️ Technology Stack

- **HTML5**: Semantic markup, OpenGraph, accessibility attributes (`aria-expanded`, `aria-selected`, `role="tab"`).
- **Tailwind CSS (CDN)**: Modern utility classes with custom brand color palette.
- **Vanilla CSS (`style.css`)**: Dark mode `#000000` overrides, CSS variables, keyframe animations, map styling.
- **Vanilla JavaScript (`main.js`)**: IntersectionObserver animations, number counters, interactive fleet selector, interactive station map, and state persistence.

---

## 🚀 How to Run Locally

Open `index.html` in any modern web browser directly, or serve with a local web server:

```bash
# Using VS Code Live Server or python
python -m http.server 8000
```
Then navigate to `http://localhost:8000`.
