# First Playable UX Revision

This revision extracts the highest-value player experience improvements from `GAMEPLAY_UX_BUILD_PLAN.md` without expanding the First Playable into a full property, team, market, or career-management simulator.

## Product direction

The player should experience a new agent's first career day, not merely operate a CRM. The CRM remains the system of record, while the dashboard explains what matters now and why.

## Included now

- Career command-center dashboard.
- Current game time and visible trust, reputation, lead score, cash, and pipeline.
- One recommended next action with a clear destination.
- Starter opportunity and lead presented in human-readable language.
- Guided first-day sequence using the existing approved actions:
  - review opportunity
  - qualify opportunity
  - win opportunity
  - complete contact
  - complete appointment
  - convert to client
  - create and close a deal
- Visible consequences for time, trust, reputation, and money.
- Success feedback after important actions.

## Explicitly deferred

- New personality, household, financing, and hidden-concern fields.
- Property search and matching.
- Showing, offer, inspection, appraisal, and contingency systems.
- Branching dialogue engine.
- Energy, fatigue, and daily action-point systems.
- Teams, vendors, brokerage ownership, market maps, investor mode, and property management.
- Career unlock trees beyond the current reputation and brokerage contract.

## Acceptance criteria

- A new player can identify the next action from the dashboard.
- The starter lead is described as a relationship, not only a database record.
- Every core action exposes its time or financial consequence where applicable.
- The player can complete the existing end-to-end loop without opening a back-office screen first.
- Existing lifecycle, finance, persistence, and test contracts remain unchanged.

## Integration rule

This is a presentation and onboarding revision. New simulation fields or rules require a separate approved decision and must not be smuggled into the UI layer.
