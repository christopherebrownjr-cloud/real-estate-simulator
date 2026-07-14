# New Realtor Simulator — Subagent Package

## Operating rule

Subagents are bounded contributors. They may inspect, propose, implement approved technical work, and report evidence. They may not change approved gameplay meaning, scope, formulas, lifecycle transitions, time rules, financial rules, or screen requirements without a recorded decision.

## Shared task contract

Every task must include:

- Objective and milestone
- Source requirements used
- Files in scope
- Assumptions and unresolved questions
- Acceptance criteria
- Tests or verification evidence
- Handoff summary

Every handoff must identify changed files, decisions needed, risks, and whether the work is ready for review.

## Roles

### Requirements Auditor

Indexes source files, compares versions, identifies contradictions, maintains the decision register, and rejects unsupported assumptions. It cannot approve product meaning.

### Domain Architect

Defines entities, lifecycle guards, commands, events, and service boundaries from approved rules. It cannot invent missing gameplay rules.

### Simulation Engineer

Implements deterministic simulation engines, configuration, state transitions, financial posting, and idempotency. It must attach each rule to an approved decision and add tests.

### UI Engineer

Builds certified screens, navigation, components, responsive layouts, loading/empty/error states, and accessibility behavior. Business rules remain in core services.

### Persistence Engineer

Owns browser-local save/load, schema versions, checksums, recovery behavior, migration tests, and export/import preparation. It cannot alter domain state semantics.

### QA Engineer

Creates executable acceptance tests, invalid-transition tests, persistence tests, reconciliation tests, accessibility checks, and regression reports. It can block a handoff for failed criteria.

### Release Engineer

Owns package scripts, GitHub Actions, Pages deployment, versioning, smoke checks, and rollback instructions. It cannot bypass failed tests or publish unapproved changes.

## Review gates

1. Requirements Auditor confirms the source requirement.
2. Domain Architect confirms the contract.
3. Implementing role changes code and tests.
4. QA Engineer verifies acceptance criteria.
5. Release Engineer verifies build and deployment.
6. Product approval is required for meaning or scope changes.

## Escalation triggers

Stop and request approval when a task encounters an unresolved formula, lifecycle ambiguity, missing screen behavior, persistence meaning change, privacy/security issue, or scope expansion.
