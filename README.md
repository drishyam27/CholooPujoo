<h1 align="center">
  <span style="color: #FF4D3D; font-size: 2.25em;">🔱 CholooPujoo</span>
</h1>

<p align="center">
  <img src="public/images/project-icon-3d.png" alt="CholooPujoo 3D Icon" width="220" />
</p>

> **A Premium, Mobile-First Discovery & Itinerary Platform for Kolkata’s Durga Puja Festival**

---

## 📖 Project Overview

**CholooPujoo** is an immersive, mobile-first web application designed to help cultural explorers, urban adventurers, and festive planners navigate the largest autumn carnival in the world: the **Durga Puja festival in Kolkata**. 

By blending modern discovery engine capabilities with rich heritage details, CholooPujoo allows visitors to explore the historical *"Bonedi Bari"* (heritage family household) pujos alongside the modern, grand, and iconic *"Sarbojanin"* (community) installations across North and South Kolkata. 

The application features a warm, nocturnal atmosphere defined by the signature **"Espresso & Ember"** design system, evoking the warm glow of oil lamps (*diyas*) and festive nights.

---

## 🎨 Visual Identity & Design System

The application's aesthetics are governed by the custom **Espresso & Ember** design token:

*   **Backgrounds (`#1F0F0D`):** Rich, deep espresso brown to mimic midnight atmospheres.
*   **Accents (`#FF4D3D`):** Vibrant, burning coral and warm orange-red highlights that mirror traditional lamps and lights.
*   **Frosted Glass (`glass`):** Subtle glassmorphism overlays (`backdrop-filter: blur(12px)`) representing atmospheric lantern glows.
*   **Typography:** Harmonized pairing of **Outfit** (clean, modern interface elements) and **Playfair Display** (traditional, serif headings reflecting cultural heritage).
*   **Imagery:** Architectural structures, lights, and heritage textures. *Contains strictly no human faces or portraits to maintain an immersive, atmospheric atmosphere.*

---

## ✨ Core Feature Set (From A to Z)

### 🔐 1. Secure Authentication
*   **Google OAuth Sign-In:** One-click seamless authentication via Gmail using **NextAuth.js**.
*   **Secure Route Guards:** Protects personalized pages (Dashboard, Category lists, Itineraries) from unauthenticated access, securely redirecting guests to the festive sign-in screen.

### 🧭 2. Real-Time Discovery Engine (Home Screen)
*   **Themed Discovery Cards:** Grid-based categories targeting **Bonedi Bari** (Heritage), **North Kolkata** (Traditional & Grand), and **South Kolkata** (Modern & Iconic) pandals.
*   **Live Status Badges:** Reflects crowd conditions at any given pandal.

### 🗺️ 3. In-App Route Map Modals
*   **Frosted Glass Modal:** Clicking a pandal's directions/map icon opens a premium, custom React modal overlay that matches the theme.
*   **Animated Indicator:** Displays an interactive "Map Loading..." animated state, serving as a future gateway for Leaflet and Mapbox routing.
*   **Fallback Directions:** Includes a direct secondary link to open directions in Google Maps in a new tab.

### 👥 4. Live Crowd Level Indicators
*   **Crowd Visualizers:** Three distinct color-coded badges indicating local density levels:
    *   🟢 **Medium Crowd:** Low traffic, highly comfortable.
    *   🟡 **High Crowd:** Increasing traffic, moderately dense.
    *   🔴 **Extreme Crowd (Pulsing):** High density, standard festive crowd peaks.

### 📋 5. Personalized Itinerary Dashboard
*   **Interactive Bookmarks:** Seamlessly toggle bookmarks to add pandals to a personal **"Want to Go"** itinerary.
*   **Progress Tracker:** Check off visited pandals as **"Completed"** to easily monitor your festive journey.
*   **Local Storage Syncing:** Keeps bookmarks and completed lists saved on the user's browser, persisting across refreshes.

### 🔗 6. Native WhatsApp Integration
*   **Instant Sharing:** A dedicated action button on your dashboard allows you to compile your curated itinerary and share it directly with friends and family via a single click on WhatsApp.

---

## 🛠️ Technical Architecture Highlights

To run "goodly" on all developer environments (especially Windows) and production clusters, the application utilizes three advanced backend layers:

### ⚡ 1. Programmatic Node.js DNS Resolution Override
Local Windows environments and standard ISP routers often fail to resolve MongoDB's advanced DNS SRV record URLs (`mongodb+srv://`), causing `querySrv ECONNREFUSED` crashes. 
We integrated a programmatic DNS override inside the connection layers to force the active Node.js process to query Google's public DNS servers (`8.8.8.8`) directly:
```typescript
import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
```

### 🔋 2. Global Mongoose Connection Caching
Next.js serverless and development environments trigger frequent hot-reloads on file saves. To prevent the app from opening a new database connection on every save (quickly exhausting the MongoDB pool), we implemented a shared global connection promise cache:
```typescript
let cached = global.mongoose || { conn: null, promise: null };
```

### 🔌 3. Official NextAuth MongoDB Adapter
Eliminated custom sync handlers in favor of the official **`@next-auth/mongodb-adapter`**. NextAuth connects directly using a raw `MongoClient` promise, creating and maintaining four core tables automatically upon Google Login:
*   `users`: Stores user profile names, emails, and profile image URLs.
*   `accounts`: Connects the internal user ID to the Google OAuth identity.
*   `sessions`: Manages secure server-side session cookies.

---

## 📂 Project Directory Structure

```text
choloopujoo/
├── .next/                         # Compiled Next.js application cache
├── app/                           # Next.js App Router root
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts       # NextAuth.js API config (Google & MongoDB Adapter)
│   ├── category/
│   │   └── [slug]/
│   │       └── page.tsx           # Categorized Pandal lists
│   ├── itinerary/
│   │   └── page.tsx               # Itinerary Dashboard (WhatsApp sharing)
│   ├── login/
│   │   └── page.tsx               # Thematic "Festive Noir" sign-in page
│   ├── globals.css                # Custom 'Espresso & Ember' theme & variables
│   ├── layout.tsx                 # Root layout wrapping all page context providers
│   └── page.tsx                   # Main exploration landing page
├── backend/                       # ⚙️ All backend-specific services & database setups
│   ├── models/                    # Mongoose database schemas
│   │   ├── User.ts                # User model schema
│   │   └── Pandal.ts              # Pandal model schema
│   ├── mongodb.ts                 # Mongoose cached connection layer
│   └── mongodb-client.ts          # Raw MongoClient cached promise for NextAuth Adapter
├── frontend/                      # 🎨 All client-side UI components, contexts, and helper data
│   ├── components/                # Reusable client components
│   │   ├── Navbar.tsx             # Sleek navigation header
│   │   ├── CategoryCard.tsx       # Immersive category card
│   │   └── PandalCard.tsx         # Interactive card with Route Map Modal
│   ├── context/                   # Frontend context wrappers
│   │   ├── AppContext.tsx         # Global React context (Bookmarks, Visited state)
│   │   └── NextAuthProvider.tsx   # NextAuth client session provider wrapper
│   └── lib/                       # Frontend helper data
│       └── mockData.ts            # Local fallback mock Pandal lists
├── public/                        # Static assets (images, icons, styles)
│   ├── images/                    # Custom atmospheric Pandal graphics
│   └── durga-eyes.jpg             # High-res favicon and icon
├── package.json                   # Project packages and npm scripts
├── tsconfig.json                  # TypeScript compiler rules
└── next.config.ts                 # Next.js configuration rules
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
MONGODB_URI=mongodb+srv://your_db_user:your_db_password@choloopujoodb.uqou1xq.mongodb.net/CholooPujoo?appName=CholooPujooDB

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
