# MVP Roadmap

## TL;DR

Build the core fantasy experience first (auth, tournament ingestion, roster UI, scoring, leaderboards) and then add minimal admin tools and future extensions.

---

## Phase 1 – Foundations (Weeks 1‑2)

1. ✅ **Project scaffolding** – initialize a monorepo with Fastify backend and React/Vite frontend. _(parallel with step 2)_
2. **Authentication** – session‑cookie login & registration endpoints; store users in Postgres. _(depends on step 1)_
3. **Database schema (MVP core)** – tables: `users`, `tournaments`, `players`, `rosters`, `scores`, `standings`. _(depends on step 1)_
4. **API client stub** – thin wrapper for Aligulac/Battle.net (fetch tournament list, player list, match results). _(parallel with step 3)_

---

## Phase 2 – Automated Data Ingestion (Weeks 3‑4)

5. **Background job scheduler** – set up `node‑cron` (or `bullmq`) to run every 5 min. _(depends on step 4)_
6. **Tournament sync** – pull upcoming tournaments, store them in `tournaments` (including external API ID). _(depends on step 5)_
7. **Player sync** – pull player roster for each tournament, store static price (fixed for MVP). _(depends on step 5)_
8. **Score calculation** – process match results, compute fantasy points, write to `scores`, update `standings`. _(depends on steps 6‑7)_

---

## Phase 3 – Front‑end Core Flow (Weeks 5‑6)

9. **Tournament list UI** – display synced tournaments, show status (upcoming, live, finished). _(depends on steps 6‑7)_
10. **Roster builder** – budget‑based player selection UI; POST roster to `/rosters`. _(depends on auth and player data)_
11. **Live standings view** – TanStack Query fetches `standings` and renders the leaderboard. _(depends on step 8)_
12. **Seasonal aggregation** – endpoint that aggregates tournament scores into a seasonal ranking. _(depends on step 8)_

---

## Phase 4 – Minimal Admin & Moderation (Weeks 7‑8)

13. **Admin override flag** – add `isAdminOverride` column to `scores` and an admin endpoint to edit a score. _(depends on step 8)_
14. **Admin UI** – tiny dashboard for admins to view tournaments, manually correct a score or tournament status. _(depends on step 13)_
15. **Support channel stub** – endpoint to receive user‑reported issues (e.g., email webhook). _(depends on step 13)_

---

## Phase 5 – Polish & Deploy (Weeks 9‑10)

16. **Dockerfile & CI** – multi‑stage Docker build, health‑check endpoint, basic CI pipeline.
17. **Testing** – unit tests for auth, API client, scoring logic; integration test for background job.
18. **Documentation** – update README, API docs, and the revised `architecture.md`.
19. **Deploy to staging** – run on a cheap VPS or cloud instance; verify end‑to‑end flow.

---

## Future Extensions (post‑MVP)

- Dynamic player pricing engine.
- Community‑submitted statistics, voting, dispute workflow.
- Expanded tournament customization (community‑run leagues).
- JWT auth / OAuth for third‑party login.
- Micro‑service split if scaling demands.

---

## Verification Steps

1. Register a user, log in, and create a roster for a live tournament.
2. Confirm the background job pulls tournament data and updates scores automatically.
3. Verify the leaderboard updates in real time as scores change.
4. Use the admin UI to manually adjust a score and see the change instantly.
5. Run the full CI pipeline; ensure the Docker image builds and the app starts without errors.

---

## Decisions

- **Fixed pricing** is used throughout MVP; dynamic pricing is deferred.
- **Community stats, voting, and dispute systems** are omitted for now.
- **Monolith architecture** is retained for simplicity.
