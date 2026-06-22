# AI Development Guidelines (MVP‑Focused)

Hay Day Trading Website:

 **Node.js**
 **TypeScript**
 **Fastify**
 **React**
 **Vite**
 **Material UI**
 **Postgres**
 **Prisma**

## Frontend

 **React SPA** – single‑page app served by Fastify.
 **TanStack Query** – server‑state fetching, caching, and automatic refetching of tournament data.
 **Zustand** – lightweight UI‑state store (modal visibility, form inputs, etc.).
 **Material UI** – consistent, accessible UI components.

## Backend

 **Session‑cookie authentication** – simple cookie‑based login for the MVP; JWT can be added later.
 **Lightweight background jobs** – a single cron‑style job (e.g., using `nodecron` or `bullmq`)

## Database (Prisma + Postgres)

Essential tables for MVP:

 `users` – authentication & profile data.

## Minimal Moderation
 **User Addition** Users can be signed up for Hay Day only manually
 **Reputation** Reputation affected by trading, thresholds which cross should be brought up.

## Core Product Systems (MVP Scope)

**Buy Orders**
**Sell Orders**
**Handshake System**


## Guiding Principles
 **Shallow folder nesting** – easy navigation for new contributors.
 **Incremental extensibility** – new features can be added as separate modules without refactoring core layers.

