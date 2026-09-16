# Real Estate Empire — V1 Implementation Plan

Status: Approved for implementation
Branch: `feature/real-estate-empire-v1`
Base: `main`

## Product Goal
Evolve the existing New Realtor Simulator into a persistent, expandable real-estate career and business simulation without breaking the tested simulation core.

## Non-Negotiables
- Preserve the existing `src/core/` business rules until migrations are explicitly tested.
- Preserve existing tests and add tests for every new state transition.
- Do not overwrite the working GitHub Pages release while V1 is being built.
- Game state must remain deterministic for financial transactions and lifecycle changes.
- AI may narrate, coach, generate scenarios, and recommend actions, but deterministic code owns money, deal status, time, and persisted game state.

## V1 Player Experience
The player opens a Career Command Center showing:
- cash and lifetime commission
- current day/week
- reputation and trust
- active leads and clients
- appointments/tasks
- active transactions
- urgent follow-ups
- market opportunities
- recent activity

The player can work through:
1. Prospecting / opportunity discovery
2. Lead qualification and follow-up
3. Appointment conversion
4. Client representation
5. Listing/buyer transaction management
6. Escrow and closing
7. Commission settlement
8. Reputation, referral, and business growth

## V1 Systems

### 1. Persistent Game State
Introduce a storage adapter so the current localStorage implementation becomes one storage option rather than being embedded in game logic.

Target persisted entities:
- player/career
- game clock
- leads
- contacts
- clients
- tasks
- appointments
- transactions
- ledger entries
- activities
- notifications
- scenario history
- AI game-master memory/state

### 2. Time Engine
Support:
- Day
- Week
- Fast Forward

Advancing time must resolve overdue tasks, pipeline changes, scenario triggers, expenses, client follow-up consequences, and market events through deterministic rules.

### 3. CRM
Pipeline:
- New / Unworked
- Contacted / Follow Up
- A+ Seller Lead
- Appointment Set
- Appointment Held
- Listing Signed / Buyer Signed
- Active Listing / Active Buyer
- Under Contract
- Closed
- Nurture / Lost

Each record needs activity history, next action, relationship/trust, source, motivation, timeline, and notes.

### 4. Finance Command Center
Track:
- cash
- pending commission
- lifetime GCI
- brokerage split
- business expenses
- marketing spend
- closed volume
- projected pipeline income
- transaction ledger

All monetary changes remain deterministic and idempotent.

### 5. AI Game Master
AI responsibilities:
- narrate realistic scenarios
- create prospect/client dialogue
- surface choices
- coach after decisions
- generate market/business events
- remember meaningful prior interactions through structured game context

AI cannot directly mutate authoritative money, transaction status, or time. It returns structured proposed events/actions that the game engine validates.

### 6. Market & Farming
V1 foundations:
- neighborhoods / farm areas
- prospecting channels
- lead-source performance
- market conditions
- reputation by market
- recurring prospecting opportunities

### 7. Team / Vendor Foundation
Data model foundations for:
- assistant/TC
- lender
- title/escrow
- photographer
- contractors/vendors
- referral partners

Full hiring/economics can follow after V1.

## Architecture Direction
Current Vite app remains the protected working baseline.

Target V1 architecture:
- full-stack Vercel-compatible application
- server-side persistence
- authenticated player career
- relational database for authoritative state
- AI endpoint/game-master service
- structured event log for replay/debugging
- migration/import path for browser-local saves

Before framework migration:
1. inventory all current screens and commands
2. extract storage behind an adapter
3. expand core tests
4. define V2 game-state schema
5. define event/action contracts

## Build Order
### Milestone 1 — Foundation
- storage adapter
- V2 state schema
- migration layer from current save
- event/action contracts
- expanded tests

### Milestone 2 — Career Command Center
- upgraded dashboard
- CRM pipeline
- finance command center
- calendar/tasks
- Day/Week/Fast Forward controls

### Milestone 3 — Persistent Backend
- authentication
- database
- server persistence
- career slots / resume game
- audit/event history

### Milestone 4 — AI Game Master
- scenario generation
- structured AI responses
- contextual coaching
- persistent game-master context
- safety/validation boundary between AI and engine

### Milestone 5 — Business Expansion
- farming
- marketing/prospecting
- vendors/referrals
- team foundation
- business expenses
- richer random events

## Release Gates
V1 cannot replace the current live release until:
- existing tests remain green
- new state/migration tests pass
- finance ledger integrity passes
- save/resume passes
- mobile smoke test passes
- no AI action can bypass deterministic financial/lifecycle rules
- Vercel preview deployment is verified

## Immediate Next Engineering Task
Implement Milestone 1 on this branch, beginning with a storage adapter and V2 state/schema design while leaving existing player behavior intact.
