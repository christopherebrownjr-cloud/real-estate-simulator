# New Realtor Simulator — Project Context Handoff

Last updated: 2026-07-14

## Purpose

This document is the durable handoff for continuing development in a new session. It summarizes the approved product decisions, current implementation, deployment, and remaining work. Do not rely on conversation history when this file or the linked project documents are available.

## Repository and deployment

- Repository: https://github.com/christopherebrownjr-cloud/real-estate-simulator
- Live site: https://christopherebrownjr-cloud.github.io/real-estate-simulator/
- Branch: `main`
- Latest pushed commit: `149d78f`
- Hosting: GitHub Pages through `.github/workflows/deploy.yml`
- Vite base path: `/real-estate-simulator/`
- Deployment has been verified with HTTP 200 and working JS/CSS assets.

## Approved product decisions

- Single-player and web-only.
- Browser-local persistence for MVP; JSON backup export/import is available.
- Executive time uses explicit action-based time costs.
- Progression is milestone-gated and explainable.
- Trust, reputation, and lead-score draft values were approved as written in `docs/APPROVED_DECISIONS.md`.
- First Playable includes the 14-screen design set documented in `docs/SCREEN_NAVIGATION_PLAN.md` and the attached Claude Design package.
- Brokerage contract is negotiable once per First Playable career: default player share 70%, range 50%–90%.
- First Playable financial policy: USD, 3% deal-specific commission, no referral fees, no deductions, immediate close posting, two-decimal half-up rounding, cancelled deals pay no commission.

## Implemented systems

- Opportunity qualification and conversion.
- Lead contact and appointment progression.
- Client conversion and client status.
- Deal creation, activation, escrow, closing confirmation, and close.
- Negotiable brokerage share stored on the player contract and copied to deals.
- Trust, reputation, lead score, action-based game hours.
- Immutable/idempotent commission ledger.
- Cash and lifetime earnings updates.
- Browser-local save/load with checksum, recovery save, version gate, and JSON backup import/export.
- Seven automated Node tests covering progression, invalid transitions, negotiation, closing, ledger behavior, integrity, and round-trip saves.

## Implemented UI

- New Game / Player Setup.
- Dashboard.
- Opportunity Inbox and Detail.
- Lead CRM and Lead Detail.
- Appointments & Tasks.
- Client Portfolio and Client Detail.
- Deal Workspace and Closing Confirmation.
- Financial Ledger.
- Activity & Notifications.
- Save / Load.
- Responsive navigation, light design system, logo, score meters, keyboard focus, live status semantics.
- Mobile bottom navigation and accessible status glyphs/pipeline stepper.

## Design integration status

Claude Design package: `New Realtor UI Design.zip`, reviewed and partially integrated.

Integrated safely:

- Light neutral palette.
- Indigo accent.
- White cards and refined borders.
- Logo asset at `public/assets/realtor-sim-logo.svg`.
- Typography hierarchy direction.
- Responsive navigation direction.
- Trust/reputation progress meters.

Not yet fully integrated:

- Full sidebar component fidelity.
- Mobile bottom tab bar.
- Status glyph mapping.
- Pipeline stepper.
- All loading/error/disabled states from the package.
- Full screen-by-screen visual parity.

The isolated Claude prototype must not be copied directly into the application. Use its tokens and specifications as the reference while keeping business rules in `src/core/`.

## Current source structure

- `src/core/config.js` — approved tunable values.
- `src/core/simulation.js` — state creation, commands, transitions, finance, persistence serialization.
- `src/main.js` — current render layer and screen navigation.
- `src/styles.css` — current visual layer.
- `test/simulation.test.js` — automated core tests.
- `docs/APPROVED_DECISIONS.md` — approved product decisions.
- `docs/SUBAGENT_PACKAGE.md` — role contracts and authority limits.
- `docs/SCREEN_NAVIGATION_PLAN.md` — navigation and screen order.
- `docs/FIRST_PLAYABLE_RELEASE_CHECKLIST.md` — release gate.

## Remaining work, in priority order

1. Run full browser smoke test on the live site.
2. Complete screen-reader and keyboard review.
3. Review mobile layout at 320px and 390px widths.
4. Add a migration fixture test for a future schema version.
5. Complete Claude Design visual integration.
6. Add status glyphs and pipeline stepper.
7. Add loading, error, disabled, and validation states screen by screen.
8. Re-run tests, production build, and Pages deployment.
9. Prepare First Playable release notes.

## Latest release verification

- Automated tests: 7 passing.
- Production build: passing with Vite 6.4.3.
- Live page: HTTP 200.
- Live JavaScript asset: HTTP 200.
- Live CSS asset: HTTP 200.
- Remaining release gate: manual browser smoke test, screen-reader review, and mobile visual review.

## Approval protocol

- Technical refactors and tests may proceed with normal review.
- Product meaning, scope, formulas, lifecycle rules, time rules, financial rules, and visual direction changes require user approval.
- Commits may be created locally after implementation and verification.
- Pushes to `main` require explicit user approval.
- Never overwrite `src/core/`, tests, persistence, or deployment configuration with an external design export.
