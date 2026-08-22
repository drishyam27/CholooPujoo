<p align="center">
  <img src="public/images/title.svg" alt="🔱 CholooPujoo 🔱" width="450" />
</p>

<p align="center">
  <img src="public/images/ddi-logo.png" alt="Dugga Dugga Intelligence DDI Logo" width="120" style="border-radius: 20px; box-shadow: 0 0 30px rgba(255, 77, 61, 0.4);" />
</p>

<p align="center">
  <a href="https://choloopujoo.vercel.app/" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/Live%20Demo-choloopujoo.vercel.app-FF4D3D?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
  <img src="https://img.shields.io/badge/Next.js-16.2.4-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/MongoDB%20Atlas-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Supabase-Realtime-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
</p>

<p align="center">
  <strong>Kolkata’s Ultimate Festival Companion: 93 Mega Pandals, Sharadiya Ponjika 2026, Dugga Dugga Intelligence (DDI) AI, Realtime Leaderboard & Custom Itineraries</strong>
</p>

<p align="center">
  <a href="#-project-overview">Overview</a> •
  <a href="#-core-feature-showcase">Features</a> •
  <a href="#-sharadiya-ponjika-2026--pujo-beats">Ponjika Calendar</a> •
  <a href="#-dugga-dugga-intelligence-ddi-ai">DDI AI Engine</a> •
  <a href="#-technical-architecture-marvels">Architecture</a> •
  <a href="#-setup--local-installation">Installation</a>
</p>

---

## 📖 Project Overview

**CholooPujoo** (চলো পুজো) is an immersive, high-fidelity web application designed to guide cultural explorers, festive hoppers, and tourists through the largest autumn carnival on Earth: **Kolkata Durga Puja**.

Engineered under a luxurious nocturnal **"Espresso & Ember"** design system, CholooPujoo connects users with **93 celebrated Pujos** across Kolkata — from centuries-old *Bonedi Bari* heritage households to monumental *Sarbojanin* theme pandals. The platform delivers real-time crowd insights, dark-themed interactive maps, a 12-day **Sharadiya Ponjika 2026** festival chronicle with built-in Pujo beats, a Supabase-powered realtime **Maha Leaderboard**, and **Dugga Dugga Intelligence (DDI)** — a custom spatial navigation AI.

---

## 🎨 Visual Identity & Design System

The application's aesthetics adhere strictly to modern web design standards, creating a premium nocturnal experience:

* ☕ **Nocturnal Espresso (`#1F0F0D`):** A deep, velvet chocolate background evoking midnight festival pandal walks.
* 🔥 **Burning Ember (`#FF4D3D`):** Vibrant red-coral glow effects mirroring traditional clay lamps (*diyas*) and neon illumination gates.
* ✨ **Frosted Glassmorphism (`glass`):** Multi-layered backdrop blurs (`backdrop-filter: blur(12px)`) with subtle glowing borders mimicking paper lanterns.
* 🏛️ **Heritage Typography:** Pairing **Outfit** (sleek, high-readability UI tokens) with **Playfair Display** (graceful serif headings).
* 🌺 **Traditional Calligraphy & Slogans:** Features glowing Bengali typography including *"বলো দুগ্গা মাই কি জয়!"* and *"আশ্বিনের শারদ প্রাতে বেজে উঠেছে আলোক মঞ্জীর, মা এসেছে ঘরে"*.

---

## 🌟 Core Feature Showcase

### ⛩️ 1. Master Catalog of 93 Kolkata Pujos
Curated database of 93 Durga Puja Pandals categorized into three distinct exploration zones:
* 🛕 **South Kolkata** (38 Pandals): World-renowned crowd pullers like *Suruchi Sangha*, *Chetla Agrani*, *Ekdalia Evergreen*, *Tridhara Akorjon*, and *Maddox Square*.
* 🏰 **North & Central Kolkata** (42 Pandals): Iconic architectural marvels including *Sreebhumi*, *Bagbazar Sarbojonin*, *College Square*, *Santosh Mitra Square*, and *Ahiritola*.
* 🏡 **Bonedi Baris** (13 Heritage Homes): Centuries-old ancestral household pujos including *Sovabazar Rajbari*, *Mallick Bari*, *Laha Bari*, and *Chhatu Babu Latu Babu Thakurbari*.

### 📱 2. Unified Responsive Glass Menu Bar
Consolidated top navigation bar featuring a glowing **"Menu ☰"** button:
* **Clean Single Header**: Replaces cluttered link bars with a unified, high-contrast action button.
* **Slide-Out Frosted Glass Drawer**: Clicking **Menu** opens a full-screen blurred navigation modal across **Desktop, Tablet, and Mobile phones**, providing instant access to:
  1. 🔥 **Explore Pandals** (`/`)
  2. 📅 **Sharadiya Ponjika 2026** (`/calendar`)
  3. 🗺️ **My Itinerary** (`/itinerary`)
  4. 💬 **DDI Chatbot** (`/ddi`)
  5. 🏆 **Maha Leaderboard** (`/leaderboard`)
  6. 👤 **User Profile** (`/profile`)
  7. 🚪 **Logout**

### 🗺️ 3. Dark-Themed Interactive Google Maps
Every pandal card includes an inline interactive **Route Map Modal**:
* **Embedded Satellite Maps**: Renders zoomable Google Maps iframe centered on exact pandal coordinates.
* **Custom Dark Filter**: Uses CSS inverted hue rules to style standard maps into dark nocturnal visuals that blend naturally with the Espresso & Ember theme.
* **Direct Navigation**: One-click link opens live turn-by-turn navigation in Google Maps.

### 🏆 4. Realtime Maha Leaderboard & 3D Podium
Tracks and displays top Pandal Hoppers live using **Supabase Realtime**:
* **3D Glass Podium**: Highlights the Top 3 hoppers with Gold, Silver, and Bronze trophies.
* **Live Stream Feed**: Updates rank positions dynamically as users check off visited pandals.
* **User Profile Rankings**: Displays real-time global explorer ranks (`Global Rank #1`) on personal dashboards.

### 🎭 5. Traditional Pujo Avatar Customizer
Users personalize their accounts with 10 hand-crafted Pujo avatars:
* 👩 **5 Female Avatars**: *Shreya (Laal Paar Saree)*, *Pooja (Mustard Anjali)*, *Riya (Sandhi Pujo Royal)*, *Tiyasha (Diyas of Ekadashi)*, and *Debolina (Sindoor Khela Crimson)*.
* 🧔 **5 Male Avatars**: *Aniket*, *Raj*, *Drishyam*, *Joy*, and *Sayan* dressed in traditional Dhuti-Punjabi.

### 📋 6. Customized Itinerary & WhatsApp Share
* **Wishlist Checklist**: Add any of the 93 pandals to a personalized hopping list.
* **One-Click WhatsApp Export**: Compiles saved pandals into a clean, formatted text message to share instantly with friends and family.

---

## 📅 Sharadiya Ponjika 2026 & Pujo Beats

CholooPujoo features a complete 12-day interactive festival calendar (`/calendar`):

```text
Mahalaya (Oct 11) ➔ Prothoma (Oct 12) ➔ Dwitiya (Oct 13) ➔ Tritiya (Oct 14) ➔ 
Chaturthi (Oct 15) ➔ Panchami (Oct 16) ➔ Shashthi (Oct 17) ➔ Saptami (Oct 18) ➔ 
Ashtami (Oct 19) ➔ Navami (Oct 20) ➔ Dashami (Oct 21) ➔ Ekadashi (Oct 22)
```

### 🎨 Features of Ponjika Days (`/calendar/[slug]`):
* **16:9 Uncropped Full-Bleed Imagery**: Custom high-resolution 16:9 widescreen artwork framing Maa Durga, street illuminations, and traditional rituals without top or bottom cropping.
* **Beat-Style Soundwave Equalizer**: Integrated HTML5 audio player featuring an interactive, 36-bar frequency soundwave beat track. Users can click anywhere on the soundwave to jump on beat!
* **Authentic Audio Playback**: Plays iconic festival audio tracks (including *Birendra Krishna Bhadra's Mahishasuramardini* on Mahalaya).
* **Rituals & DDI AI Strategy**: Provides day-specific rituals, crowd predictions, and DDI spatial tips.

---

## 🧠 Dugga Dugga Intelligence (DDI) AI

**Dugga Dugga Intelligence (DDI)** is the custom AI spatial companion powered by LLMs (Google Gemini / Groq):

<p align="center">
  <img src="public/images/ddi-logo.png" alt="DDI AI Logo Emblem" width="80" style="border-radius: 16px;" />
</p>

### 🪔 Origin of "Dugga Dugga":
In traditional Bengali culture, when loved ones depart for a journey, elders say *"Dugga Dugga!"* as a sacred prayer to Goddess Durga for safe travel. **DDI** combines this centuries-old tradition of wishing safe travel with modern spatial algorithms.

### ⚡ DDI AI Capabilities:
* **Custom Senior-Designed Logo Emblem**: Sacred golden Durga Trinayana (third eye) intertwined with glowing neural AI lines and ember sparks (`/images/ddi-logo.png`).
* **Realtime Navigation & Transit**: Calculates Haversine distances, nearest Kolkata Metro stations (e.g. *Shobhabazar Sutanuti Metro* for Sovabazar Rajbari), local train routes, and auto-rickshaw tips.
* **Crowd & Curfew Analyzer**: Evaluates IST time windows to recommend low-crowd visiting times.
* **Local Food & Culture**: Suggests iconic food stops (e.g. *Kathi rolls, Phuchka, Mishti*) along hopping routes.

---

## 🛠️ Technical Architecture Marvels

### ⚡ 1. Programmatic DNS Resolution Override
To prevent `querySrv ECONNREFUSED` issues when querying MongoDB Atlas SRV URIs on local development environments, both database clients include a programmatic DNS fallback:
```typescript
import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
```

### 🔋 2. Hot-Reload Connection Caching
Next.js serverless runtimes and fast-refresh loops preserve a global connection promise cache (`global.mongoose`) to prevent connection pool exhaustion.

### 🔌 3. NextAuth.js & Supabase Hybrid Backend
* **NextAuth Google OAuth**: Handles secure user authentication with session persistence.
* **Supabase Realtime Engine**: Manages instant live updates for pandal visit counts and leaderboard ranks.

### 🧠 4. Sørensen-Dice Fuzzy Search Engine
Implemented in `frontend/lib/searchHelper.ts`, calculating bigram overlap scores in under `0.1ms` for spelling-tolerant searches (e.g. "Sribhumi" ➔ "Sreebhumi").

---

## 📂 Project Directory Structure

```text
choloopujoo/
├── app/                           # Next.js App Router
│   ├── api/                       # API routes (Auth, Chat, Leaderboard, Visit, Recommend)
│   ├── calendar/                  # Sharadiya Ponjika 2026 calendar pages
│   │   ├── [slug]/                # Day detail page with audio beat equalizer
│   │   └── page.tsx               # 12-day Ponjika grid view
│   ├── category/[slug]/           # Dynamic category filtering (South, North, Bonedi Bari)
│   ├── ddi/                       # Dugga Dugga Intelligence AI Chatbot interface
│   ├── itinerary/                 # User Itinerary Dashboard & WhatsApp export
│   ├── leaderboard/               # Realtime Maha Leaderboard & 3D Podium
│   ├── login/                     # Sign-in page with responsive mobile poster
│   ├── profile/                   # User Profile & Avatar Selector modal
│   ├── globals.css                # Core design system & Espresso & Ember tokens
│   ├── layout.tsx                 # Root layout & providers
│   └── page.tsx                   # Main exploration homepage
├── backend/                       # ⚙️ Server-side utilities & MongoDB models
│   ├── models/                    # Mongoose schemas (User, Pandal)
│   ├── mongodb.ts                 # Cached Mongoose connection layer
│   └── mongodb-client.ts          # MongoClient adapter cache
├── frontend/                      # 🎨 Client-side components & helpers
│   ├── components/                # Reusable UI components
│   │   ├── Navbar.tsx             # Unified responsive Menu Bar drawer
│   │   ├── DDICompanion.tsx       # DDI AI chatbot component
│   │   ├── AvatarSelector.tsx     # 10-Avatar selection modal
│   │   └── PandalCard.tsx         # Pandal card with dark map embed
│   ├── context/                   # AppContext & NextAuth providers
│   └── lib/                       # Catalog mock data (93 Pandals & Coordinates)
├── public/                        # Static assets & audio
│   ├── audio/                     # Pujo audio files (mahalaya.mp3)
│   ├── images/                    # Calendar day artwork & logo graphics
│   │   ├── calendar/              # 16:9 day artwork (dwitiya, tritiya, chaturthi)
│   │   ├── ddi-logo.png           # Custom DDI AI Logo Emblem
│   │   └── durga-hero-poster.png  # Login page hero artwork
│   └── durga-eyes.jpg             # Durga Trinayana brand logo
├── next.config.ts                 # Next.js configuration
└── package.json                   # Project dependencies
```

---

## 🚀 Setup & Local Installation

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/drishyam27/CholooPujoo.git
cd choloopujoo
npm install --legacy-peer-deps
```

### 2. Configure Environment Variables (`.env.local`)
Create a **`.env.local`** file in the root directory:

```env
# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/CholooPujoo?retryWrites=true&w=majority

# NextAuth Configuration
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXTAUTH_URL=http://localhost:3000

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret

# AI Engine API Keys
GROQ_API_KEY=your_groq_api_key
GEMINI_API_KEY=your_gemini_api_key

# Supabase Realtime Credentials
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Start Local Development Server
```bash
npm run dev
```
Open **`http://localhost:3000`** in your browser. Welcome to CholooPujoo! 🏮🌸
