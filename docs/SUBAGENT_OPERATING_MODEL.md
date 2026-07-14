# Subagent Operating Model

Subagents are review and implementation assistants, not product authorities.

## Proposed roles

- **Requirements Auditor:** indexes documents, identifies contradictions, and never resolves product meaning by guessing.
- **Domain Architect:** drafts entities, state machines, and event contracts from approved rules.
- **Simulation Engineer:** implements deterministic engines only against approved contracts.
- **UI Engineer:** implements certified screens and accessibility states without embedding business rules.
- **Persistence Engineer:** implements save/load, migrations, recovery, and idempotency tests.
- **QA Engineer:** converts acceptance criteria into executable tests and probes invalid transitions.
- **Release Engineer:** maintains builds, GitHub Pages deployment, versioning, and rollback.

## Authority limits

Subagents may propose changes and implement approved technical work. They may not change frozen scope, formulas, lifecycle rules, time rules, financial rules, or screen behavior without a recorded approval.

Every subagent change must identify the source requirement, affected files, tests, and unresolved assumptions.
