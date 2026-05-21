# AI Development Guidelines (MVP‑Focused)

This project is a production‑oriented SC2 fantasy platform built with:

- **Node.js** – server runtime
- **TypeScript** – type‑safe development
- **Fastify** – lightweight HTTP framework for REST APIs
- **React** – SPA front‑end
- **Vite** – fast dev server & bundler
- **Material UI** – UI component library
- **Postgres** – relational data store
- **Drizzle** – type‑safe ORM

## Architecture Goals (MVP)

- **Monolith architecture** – a single Fastify service that serves the API and static React assets. Keeps deployment simple and speeds iteration.
- **REST APIs** – clear, versioned endpoints for the front‑end and for background jobs.
- **Maintainable & conventional code** – follow standard project layouts, avoid exotic patterns.
- **Minimal abstraction** – explicit functions and types; prefer readability over cleverness.
- **Locality of behavior** – related code lives together (e.g., `src/tournaments/*`, `src/rosters/*`).
- **Production‑friendly design** – Docker‑ready, environment‑based configuration, health checks.

## Frontend

- **React SPA** – single‑page app served by Fastify.
- **TanStack Query** – server‑state fetching, caching, and automatic refetching of tournament data.
- **Zustand** – lightweight UI‑state store (modal visibility, form inputs, etc.).
- **Material UI** – consistent, accessible UI components.

## Backend

- **Session‑cookie authentication** – simple cookie‑based login for the MVP; JWT can be added later.
- **Feature‑oriented organization** – each domain (tournaments, rosters, scoring, auth) lives in its own folder under `src/`.
- **Lightweight background jobs** – a single cron‑style job (e.g., using `node-cron` or `bullmq`) that:
  - Pulls tournament schedules and results from official SC2 APIs (Aligulac, Battle.net).
  - Updates player performance, calculates fantasy points, and writes to `scores`.
  - Refreshes standings.
- **Fixed player pricing** – player values are stored as static numbers in the DB for the MVP. The dynamic‑pricing module remains as a placeholder for future work.

## Database (Drizzle + Postgres)

Essential tables for MVP:

- `users` – authentication & profile data.
- `tournaments` – metadata, external API IDs, status flags.
- `players` – static player info and fixed price.
- `rosters` – user‑selected line‑ups per tournament.
- `scores` – calculated fantasy points per player per match.
- `standings` – aggregated tournament and seasonal rankings.

**Deferred tables** (keep as TODO placeholders):

- `community_stats`
- `votes`
- `disputes`
- `dynamic_pricing`

## Minimal Moderation

- **Admin override** – a simple boolean flag (`isAdminOverride`) on `scores`/`tournaments` that allows an admin to correct edge‑case data.
- **Support channel** – users can report scoring issues; admins resolve them via the admin UI.
- No voting, reputation, or complex dispute queues in the MVP.

## Core Product Systems (MVP Scope)

- **Tournaments** – fetched automatically from external APIs; stored with minimal metadata.
- **Fantasy rosters** – budget‑based player selection UI.
- **Fixed player pricing** – static values defined in the DB.
- **Standings & leaderboards** – calculated from `scores`.
- **API ingestion & scoring** – background job that runs every few minutes.

_Future placeholders_ (not implemented in MVP but kept for later):

- Dynamic player pricing
- Community‑submitted statistics
- Voting & dispute workflows
- Advanced moderation tooling

## Guiding Principles

- **Simple, understandable implementations** – prioritize readability.
- **Explicit code over abstraction** – keep functions small and well‑named.
- **Shallow folder nesting** – easy navigation for new contributors.
- **Incremental extensibility** – new features can be added as separate modules without refactoring core layers.

---

_This document will evolve as the product grows. The current version reflects the MVP focus on automated data ingestion, fixed pricing, and minimal moderation._
