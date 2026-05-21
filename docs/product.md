# Product Vision

## Overview

This project is a fantasy esports platform initially focused on StarCraft II tournaments. The long‑term goal is to support community‑run fantasy leagues and tournaments for niche competitive communities, but the initial product should remain strongly focused on SC2 and avoid premature generalization.

The platform combines:

- tournament fantasy gameplay
- **fixed** player valuation (MVP)
- leaderboard progression
- official API integration
- minimal moderation workflows

The goal is to build a real, maintainable product that can expand gradually based on real user behavior and community needs.

---

# Initial Product Scope

## SC2 Fantasy (generic & extensible)

The initial release centers around fantasy participation for SC2 tournaments. The design is generic enough to support any SC2 tournament format and can be extended later to other SC2 events.

Users:

- create accounts
- participate in fantasy tournaments
- build rosters under a budget
- earn points based on player performance
- compete on tournament and seasonal leaderboards

Fantasy participation is tournament‑based rather than season‑ownership‑based. This keeps:

- onboarding simple
- balancing manageable
- tournaments engaging
- implementation complexity reasonable

---

# Core Fantasy Loop

For each tournament:

1. Users select players within a budget
2. Players earn fantasy points based on tournament performance (fetched automatically from official APIs)
3. Tournament standings update over time
4. Seasonal rankings aggregate tournament performance

The system should encourage users to continue interacting throughout a tournament instead of selecting a roster once and leaving.

---

# Fixed Player Pricing (MVP)

For the MVP, player values are fixed based on initial estimates. This removes the need for a complex dynamic‑pricing engine while still providing strategic roster decisions. Dynamic pricing can be introduced in later iterations.

---

# Official API Integration

The platform integrates with official SC2 APIs (e.g., Aligulac, Battle.net) to automatically fetch:

- tournament schedules and results
- player performance data
- match outcomes

This ensures accurate, real‑time scoring without manual data entry. If an API requires a paid plan, the MVP can start with the free tier or a limited‑scope key; the system is built to swap providers later.

---

# Minimal Moderation

The initial moderation system is intentionally simple:

- automated tournament creation via API linkage
- manual admin review only for edge‑case data corrections or dispute resolution
- basic support channel for users to report scoring issues

Avoid complicated trust/reputation systems early.

---

# Community Tournament Support

After the professional SC2 fantasy system is stable, the platform should expand toward:

- community‑created SC2 tournaments
- organizer‑managed fantasy leagues
- invite‑based participation
- customizable tournament configurations

Initial customization should remain limited and practical.

---

# Monetization

Initial monetization expectations are intentionally modest.

Potential monetization:

- advertisements
- optional ad‑removal purchase
- organizer‑hosted premium leagues later

The platform should prioritize:

- usability
- engagement
- retention
- community growth

before aggressive monetization systems.

---

# Product Philosophy

The platform should feel:

- clean
- practical
- understandable
- responsive
- community‑oriented

Avoid:

- excessive visual complexity
- unnecessary gamification
- overcomplicated systems
- enterprise‑style product bloat

The goal is a product people genuinely enjoy using while following tournaments.

---

# Long‑Term Direction

The long‑term vision is to evolve from:

- a professional SC2 fantasy platform

into:

- infrastructure for community fantasy leagues and tournaments

Potential future expansion areas:

- community‑managed leagues
- local tournaments
- additional esports
- amateur sports
- custom fantasy rules
- advanced moderation tooling
- organizer monetization tools

However, future expansion should happen gradually and only after the core product is stable and genuinely useful.

---

# Development Priorities

Current priorities:

1. user accounts and permissions
2. tournament/player models
3. fantasy scoring system (API‑driven)
4. API ingestion and synchronization
5. standings and leaderboards
6. roster management UI
7. basic admin tooling for tournament setup
8. frontend integration (React + TanStack Query)

The focus should remain on shipping a working, maintainable product rather than prematurely optimizing for scale or feature breadth.