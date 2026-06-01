<p align="center">
  <img src="public/images/title.svg" alt="🔱 CholooPujoo 🔱" width="400" />
</p>

<p align="center">
  <img src="public/images/project-icon-3d.png" alt="CholooPujoo 3D Icon" width="200" />
</p>

<p align="center">
  <strong>A High-Fidelity, Mobile-First Discovery &amp; Itinerary Platform for Kolkata’s Grand Durga Puja Festival</strong>
</p>

<p align="center">
  <a href="#-core-feature-showcase">Features</a> •
  <a href="#-technical-architecture-marvels">Architecture</a> •
  <a href="#-setup--local-installation">Installation</a> •
  <a href="#-project-directory-structure">Structure</a>
</p>

---

## 📖 Project Overview

**CholooPujoo** is an immersive, high-fidelity web application designed to help cultural explorers, urban adventurers, and festive hoppers navigate the largest autumn carnival on Earth: the **Durga Puja festival in Kolkata**. 

Designed under a luxurious **"Espresso & Ember"** aesthetic system, CholooPujoo allows users to discover a massive catalog of 93 celebrated Pujos—ranging from the centuries-old *“Bonedi Bari”* (heritage family households) to the modern, grand, and monumental *“Sarbojanin”* (community) pandals. It offers real-time crowd tracking, interactive route maps, personalized itinerary planners, a dynamic global leaderboard, and traditional avatar personalization!

---

## 🎨 Visual Identity & Design System

The application's aesthetics are governed by a premium, custom nocturnal token:

*   **Nocturnal Espresso (`#1F0F0D`):** A deep, rich chocolate-brown background evoking warm midnight festival atmospheres.
*   **Burning Ember (`#FF4D3D`):** Vibrant red-coral accents that mirror traditional clay lamps (*diyas*) and neon lighting.
*   **Frosted Glass overlays (`glass`):** Glassmorphic panels featuring `backdrop-filter: blur(12px)` and subtle borders, evoking glowing paper lanterns.
*   **Heritage Typography:** Pairing **Outfit** (for sleek, high-readability UI items) and **Playfair Display** (for traditional, elegant headings).
*   **Bengali Festive Slogan:** The home screen features the glowing traditional slogan **"বলো দুগ্গা মাই কি জয়!"** (*Bolo Dugga Mai Ki Joy!*) styled in a glowing red-amber text shadow.

---

## 🌟 Core Feature Showcase

### 🧭 1. Master Pandal Catalog (93 Pujos Loaded!)
We have curated and loaded an exhaustive database of **93 Durga Puja Pandals** categorized into three core exploration zones:
*   ⛩️ **South Kolkata** (38 Pandals): Iconic crowd-pullers including *Suruchi Sangha*, *Chetla Agrani*, *Ekdalia Evergreen*, and *Maddox Square*.
*   🏰 **North & Central Kolkata** (42 Pandals): Grand installations including *Sreebhumi*, *Bagbazar Sarbojonin*, *College Square*, and *Santosh Mitra Square*.
*   🏡 **Bonedi Baris** (13 Heritage Homes): Historical household pujos including *Sovabazar Rajbari*, *Mallick Bari*, *Laha Bari*, and *Chhatu Babu Latu Babu Thakurbari*.

### 🗺️ 2. Dark-Themed Interactive Google Maps
Each pandal card is equipped with an interactive **Route Map modal**:
*   **Embedded Live Maps**: Renders a fully functional, scrollable, and zoomable Google Map iframe centered on the specific pandal coordinates.
*   **Nocturnal Map Styling**: Custom CSS filter rules `invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)` turn the map into a glowing, dark-themed visual masterpiece that blends seamlessly with the app.
*   **One-Click Navigation**: A direct "Open in Google Maps" shortcut launches precise coordinates/search links in a new tab.

### 👤 3. Dynamic Profile Dashboard
A personalized user command center querying MongoDB on-the-fly:
*   **Global Explorer Ranking**: Calculates your real-time ranking based on how many users have more visits than you (e.g. `Global Rank #1`).
*   ** categorical progress bars**: Visual progress meters charting your hopping statistics across Bonedi Bari, North Kolkata, and South Kolkata zones.
*   **Hopped Timeline**: Displays beautiful card grids of every specific pandal you have checked off, complete with location data and map links.

### 🏆 4. Maha Leaderboard (Podium Ranking)
A dynamic ranking board displaying the top 10 pujo hoppers in the system:
*   **3D Trophy Podium**: A visual 3-column glass podium highlighting the Top 3 explorers with glowing Gold, Silver, and Bronze trophies.
*   **Rankings 4-10**: A detailed list of runner-ups showing rank badges, custom avatars, names, and total visited pandal counts.
*   **Self-Seeding competitive database**: In local environments, the database auto-populates with mock competitors on first load, so the leaderboard looks ready and alive immediately!

### 🎭 5. Traditional Durga Pujo Avatar Selector
Instead of generic icons, users can dress their profiles in 10 stunning, hand-crafted Pujo-themed illustrations:
*   👩‍🦰 **Girls Avatars (5 options)**: Dressed in traditional sarees, including *Shreya (Laal Paar Saree)*, *Pooja (Mustard Anjali)*, *Riya (Sandhi Pujo Royal)*, *Tanima (Diyas of Ekadashi)*, and *Debolina (Sindoor Khela Crimson)*.
*   🧔 **Boys Avatars (5 options)**: Dressed in traditional dhuti panjabi, featuring 3 stylishly bearded options (*Aniket*, *Raj*, *Drishyam*) and 2 clean-shaved options (*Joy*, *Sayan*) to match the elegant age and aesthetic criteria of the girls' avatars.
*   **Interactive Modal Selector**: Click your profile picture to open a scrollable modal, pick your look, and click "Save Selection" to sync it instantly to MongoDB.

### 📋 6. Personalized Itinerary & WhatsApp Sharing
*   **Want-to-Go list**: Bookmark any pandal to automatically compile your customized checklist.
*   **One-Click WhatsApp Share**: Compile your entire itinerary list ("Want to Go" and "Visited" spots) into a beautiful formatted text message and share it directly with your friends and family with a single click.

---

## 🛠️ Technical Architecture Marvels

To run flawlessly in both production clusters and local Windows environments, CholooPujoo uses advanced Next.js 14 features and database caching mechanisms:

### ⚡ 1. Programmatic Node.js DNS Resolution Override
Local development machines (especially Windows) frequently run into `querySrv ECONNREFUSED` crashes when querying MongoDB Atlas's advanced `mongodb+srv://` URIs. We integrated a programmatic override that forces the Node.js process to query Google's public DNS servers (`8.8.8.8`) directly:
```typescript
import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
```

### 🔋 2. Global Mongoose Connection Caching
Next.js fast-refresh loops trigger frequent hot-reloads on file saves, which repeatedly open database connections and exhaust MongoDB connection pools. We resolved this by implementing a global caching promise that reuse connections:
```typescript
let cached = global.mongoose || { conn: null, promise: null };
```

### 🔌 3. NextAuth.js & MongoDB Adapter integration
Authentication is powered by NextAuth.js Google OAuth using `@next-auth/mongodb-adapter`. 
*   **Named authOptions**: Refactored NextAuth handler to export `authOptions` as a named export. This enables fast, secure `getServerSession(authOptions)` lookups directly inside Next.js Server Components.
*   **Local Preview Bypass**: We temporarily bypassed the login restriction in local preview (`isLoggedIn = true` by default) so developers can test the application.
*   **Development Mock Fallback**: If no active Google session is detected, the API routes and database queries automatically map to a mock user `mock-tester@choloopujoo.com`. **This allows all interactive features (checklist check-offs, DB updates, leaderboard ranking, and profile avatar selection) to work perfectly in your local preview!**

---

## 📂 Project Directory Structure

```text
choloopujoo/
├── app/                           # Next.js App Router (Pure routing and server pages)
│   ├── api/                       # API routes and NextAuth setup
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts       # NextAuth Route Handler (Exports authOptions)
│   │   ├── leaderboard/
│   │   │   └── route.ts           # GET top 10 users ranked by visitCount
│   │   └── user/
│   │       ├── avatar/
│   │       │   └── route.ts       # POST update profile image in MongoDB
│   │       └── visit/
│   │           └── route.ts       # POST mark a Pandal as visited and increment count
│   ├── category/
│   │   └── [slug]/
│   │       └── page.tsx           # Categorized Pandal discovery lists
│   ├── itinerary/
│   │   └── page.tsx               # Itinerary Dashboard (WhatsApp share)
│   ├── leaderboard/
│   │   └── page.tsx               # Server Component displaying visual podium
│   ├── login/
│   │   └── page.tsx               # Sign-in page
│   ├── profile/
│   │   └── page.tsx               # Server Component Profile Dashboard
│   ├── globals.css                # Core design styles, fonts, and Espress & Ember variables
│   ├── layout.tsx                 # Root layout wrapping context wrappers
│   └── page.tsx                   # Exploration home screen (Traditional Slogan)
├── backend/                       # ⚙️ Server-side utilities, DB models, and schemas
│   ├── models/                    # Mongoose database schemas
│   │   ├── User.ts                # User schema (visitedPandals, visitCount, indexed)
│   │   └── Pandal.ts              # Pandal schema
│   ├── mongodb.ts                 # Mongoose cached connection layer
│   └── mongodb-client.ts          # Raw MongoClient promise cache for Adapter
├── frontend/                      # 🎨 Client-side components, contexts, and assets
│   ├── components/                # Reusable client components
│   │   ├── Navbar.tsx             # Fixed navigation bar (Profile/Leaderboard links)
│   │   ├── PandalCard.tsx         # Discovery card with dark Google Map embeds
│   │   └── AvatarSelector.tsx     # Client-Side 10-Avatar selector and modal
│   ├── context/                   # Context wrappers
│   │   ├── AppContext.tsx         # State sync toggleCompleted and MongoDB background POST
│   │   └── NextAuthProvider.tsx   # NextAuth session wrapper
│   └── lib/                       # Frontend local mock data
│       └── mockData.ts            # Extensive list of 93 Pandals with specific coordinates
├── public/                        # Static assets (images, icons, styles)
│   ├── images/                    # Local Pandal graphics and 10 custom Pujo avatars
│   └── durga-eyes.jpg             # Traditional three-eyed brand logo
├── next.config.ts                 # Configures remotePatterns (lh3.googleusercontent, api.dicebear)
└── package.json                   # Project packages & NPM script dependencies
```

---

## 🚀 Setup & Local Installation

### 1. Clone & Install Dependencies
Navigate to your workspace directory and install all core packages, ensuring to bypass conflict flags using legacy resolution:
```bash
npm install --legacy-peer-deps
```

### 2. Configure Environment Variables (`.env.local`)
Create a **`.env.local`** file in the root of the project. Next.js automatically loads these variables securely on the server-side:

```env
# 1. MongoDB Atlas Connection String (Remove < > brackets around your username & password)
MONGODB_URI=mongodb+srv://your_db_user:your_db_password@your-db-instance.mongodb.net/CholooPujoo?appName=CholooPujooDB

# 2. NextAuth Configuration (A secret 32-character string)
NEXTAUTH_SECRET=your_nextauth_secret_key_here
NEXTAUTH_URL=http://localhost:3000

# 3. Google OAuth Credentials (From Google Cloud Console)
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 3. Whitelist your Network in MongoDB Atlas
*   Log in to **[MongoDB Atlas](https://cloud.mongodb.com)**.
*   Go to **"Network Access"** under the Security tab.
*   Click **"Add IP Address"** and choose **"Allow Access from Anywhere"** (`0.0.0.0/0`).
*   Confirm and wait 1 minute for activation.

### 4. Start the Application
Boot up the Next.js local development server:
```bash
npm run dev
```
Open **`http://localhost:3000`** in your browser. Welcome to CholooPujoo! 🏮
