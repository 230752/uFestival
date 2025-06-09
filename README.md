Festival PWA
A modern Progressive Web App for managing and exploring festival content, built using React, Vite, and Tailwind CSS.

Overview
This project offers a responsive, installable web experience designed for festival-goers. It features event browsing, location mapping, and artist schedules, with offline access via PWA capabilities.

Tech Stack
React

Vite

Tailwind CSS

PWA (service worker + manifest)

Features
Fast performance with Vite

Responsive UI with Tailwind CSS

Installable and offline-capable

Event schedule and artist line-up

Interactive map with custom markers

Multi-language support (icons for language switching)

Getting Started
Prerequisites
Node.js (v16 or higher)

npm or yarn

Installation
bash
Copy
Edit
git clone https://github.com/your-username/festival-pwa.git
cd festival-pwa
npm install
Development
bash
Copy
Edit
npm run dev
Production Build
bash
Copy
Edit
npm run build
Preview Production Build
bash
Copy
Edit
npm run preview
Folder Structure
pgsql
Copy
Edit
public/
│   vite.svg

src/
├── App.css
├── App.jsx
├── index.css
├── main.jsx
│
├── assets/
│   ├── react.svg
│   ├── components/
│   │   └── Navbar/
│   │       └── Navbar.jsx
│   ├── hooks/
│   │   └── Clock.jsx
│   ├── icons/
│   │   ├── en.png
│   │   ├── home.png
│   │   ├── info.png
│   │   ├── location.png
│   │   ├── music-black.png
│   │   ├── music-white.png
│   │   ├── nl.png
│   │   └── setting.png
│   ├── img/
│   │   ├── hangar.png
│   │   ├── lake.png
│   │   ├── uFestivalLogo.png
│   │   ├── map/
│   │   │   ├── map-uf.svg
│   │   │   ├── marker_bar.svg
│   │   │   ├── marker_entrance_exit.svg
│   │   │   ├── marker_first_aid.svg
│   │   │   ├── marker_food.svg
│   │   │   ├── marker_ice_cream.svg
│   │   │   ├── marker_locker.svg
│   │   │   ├── marker_merchandise.svg
│   │   │   ├── marker_stage1_ponton.svg
│   │   │   ├── marker_stage2_the_lake.svg
│   │   │   ├── marker_stage3_the_club.svg
│   │   │   ├── marker_stage4_hangar.svg
│   │   │   └── marker_toilet.svg
│   │   └── music/artists/
│   │       ├── arminb.png
│   │       ├── chefspecial.png
│   │       ├── destaat.png
│   │       ├── dotan.png
│   │       ├── eefje.png
│   │       ├── froukje.png
│   │       ├── kensington.png
│   │       ├── marting.png
│   │       ├── navarone.png
│   │       ├── spinvis.png
│   │       └── temptation.png
│   └── json/
│       ├── home/page.json
│       ├── location/map-markers.json
│       ├── more/page.json
│       └── music/
│           ├── artists.json
│           └── schedule.json
│
├── layouts/
│   └── MainLayout.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Location.jsx
│   ├── More.jsx
│   └── Music.jsx
│
└── routes/
    └── index.jsx
PWA Configuration
The PWA is configured using Vite plugins

public/manifest.json defines the app’s metadata

A service worker caches static assets and allows offline use

Deployment
You can deploy the production-ready build (dist/ folder) to any static hosting provider:

bash
Copy
Edit
npm run build
Upload the contents of the dist/ folder to services like:

Netlify

Vercel

GitHub Pages

Firebase Hosting
