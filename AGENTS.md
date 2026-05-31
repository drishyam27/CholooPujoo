<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# 🤖 CholooPujoo Agent Instruction Manual

Welcome, Agent! This file outlines critical development guardrails, custom system architectures, and coding patterns implemented in **CholooPujoo**. Adhere to these instructions when modifying or adding features.

---

## 🧭 1. Architectural Guardrails & File Structure

We follow a strict separation of concerns. Do not introduce root-level utility directories. Keep files sorted in the respective directories:

```text
choloopujoo/
├── app/                  # Next.js App Router (Pure Routing only)
│   ├── api/              # API routes and NextAuth setup
│   ├── category/         # Dynamic routes for categories
│   ├── itinerary/        # User itinerary dashboard
│   ├── login/            # Sign-in pages
│   └── globals.css       # Core design styles and variables
├── backend/              # ⚙️ Server-side utilities, DB, and schemas
│   ├── models/           # Mongoose schemas
│   │   ├── User.ts
│   │   └── Pandal.ts
│   ├── mongodb.ts        # Mongoose cached connection
│   └── mongodb-client.ts # Raw MongoClient promise cache
└── frontend/             # 🎨 Client-side components, contexts, and mock data
    ├── components/       # Reusable components (Navbar, PandalCard, CategoryCard)
    ├── context/          # AppContext and NextAuthProvider wrappers
    └── lib/              # Local client mock data & helper functions
```

### Path Resolution
Always use root-level path aliases configured in `tsconfig.json`. Under no circumstances should you use relative back-tracking path nesting (`../../`).
*   Frontend files: `@/frontend/...`
*   Backend files: `@/backend/...`
*   Routing/pages: `@/app/...`

---

## 🎨 2. Design System: Espresso & Ember

Maintain visual uniformity by referencing the existing design tokens in `globals.css`.

*   **Nocturnal Backgrounds**: Deep rich espresso dark theme (`#1F0F0D` or `--background`).
*   **Accents**: Warm red-coral ember colors (`#FF4D3D` or `--accent-red`).
*   **Frosted Glass overlays**: Glassmorphism (`glass` CSS utility class) with standard `backdrop-filter: blur(12px)` and borders.
*   **Atmospheric Imagery**: Focus on architecture, lanterns, icons, and structures. **Avoid including human faces or stock photos.**

---

## ⚡ 3. Critical Backend Quirk Workarounds

### 🌐 Programmatic DNS Resolution Override
Local development machines (especially Windows) frequently run into `querySrv ECONNREFUSED` issues when querying MongoDB Atlas SRV URI records. 
*   **Rule**: Both `backend/mongodb.ts` and `backend/mongodb-client.ts` include a programmatic DNS server override. 
*   **Do not remove this override**:
    ```typescript
    import dns from "dns";
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    ```

### 📦 Hot-Reload Mongoose Cache
Next.js serverless runtimes and fast-refresh loops will trigger repeated database connections during edits. 
*   **Rule**: Always use the global connection promise cache (`global.mongoose`) to avoid exhausting the Atlas connection pool.

### 🔌 NextAuth.js Integration
Authentication is powered by standard NextAuth Google OAuth using `@next-auth/mongodb-adapter`. 
*   Accounts, users, and sessions are automatically created inside the MongoDB database. 
*   Keep credential verification safe. Check that your server code fetches variables dynamically from `process.env`.

---

## 🔒 4. Zero-Trust Credentials & Security Guidelines

*   **No connection secrets in repository**: Keep database URIs, Google Client IDs/Secrets, and NextAuth session secrets inside the `.env.local` file.
*   **Double-check `.gitignore`**: Make sure `.env.local` is never staged or committed.
*   **Zero Client Exposure**: Never prefix server-side database secrets with `NEXT_PUBLIC_`. Keep secret evaluations strictly encapsulated in server blocks.

---

## 🛠️ 5. Development Verification Flow

Before completing tasks, perform the following validation steps:
1.  **TypeScript & Build Validation**: Run `npm run build` to verify there are no TypeScript, dynamic routing, or module resolution errors.
2.  **Lint Check**: Run `npm run lint` to enforce clean syntax.
3.  **Local Execution**: Verify features are fully responsive under mobile viewports first (mobile-first layout).
