# Real Estate Empire — Game State V2 Draft

This schema is additive. It is a design contract for migration work and does not replace the current V1 save format yet.

## Root State
```js
{
  schemaVersion: 2,
  career: {},
  clock: {},
  brokerage: {},
  crm: {},
  transactions: [],
  finance: {},
  tasks: [],
  appointments: [],
  markets: [],
  partners: [],
  scenarios: [],
  activityLog: [],
  notifications: [],
  gameMaster: {}
}
```

## Career
- id
- displayName
- createdAtGameTime
- trust
- reputation
- experience
- careerLevel
- lifetimeClosedUnits
- lifetimeClosedVolume
- lifetimeGCI

## Clock
- dayIndex
- weekIndex
- gameHours
- phase: morning | midday | afternoon | evening
- speedMode: action | day | week

## CRM Record
- id
- contactType: lead | client | past_client | referral_partner
- firstName
- lastName
- leadType: seller | buyer | investor | landlord | other
- source
- stage
- motivation
- timeline
- priceRange
- preferredContact
- trust
- leadScore
- nextAction
- nextActionDue
- tags
- notes
- activity[]

## Transaction
- id
- clientId
- side: listing | buyer
- status
- property
- price
- commissionRate
- brokerageSplit
- projectedNet
- contractDate
- closingDate
- milestones[]
- expenses[]
- ledgerKeys[]

## Finance
- cashBalance
- pendingCommission
- lifetimeEarnings
- lifetimeExpenses
- closedVolume
- marketingSpend
- ledger[]

Every ledger mutation requires an idempotency key.

## Market
- id
- name
- type: neighborhood | zip | city
- awareness
- reputation
- farmStrength
- competition
- marketTemperature
- prospectingChannels{}

## Partner
- id
- type
- name
- relationshipStrength
- status
- referralTerms
- activity[]

## Scenario
- id
- type
- status
- createdDay
- expiresDay
- relatedEntityIds[]
- choices[]
- resolution
- gameMasterNarrative

## Game Master State
- careerSummary
- activeStorylines[]
- unresolvedThreads[]
- importantRelationships[]
- recentDecisionSummaries[]
- coachingThemes[]
- lastScenarioIds[]

## Authority Boundary
The AI Game Master may propose:
- dialogue
- scenarios
- choices
- coaching
- descriptive market events
- candidate tasks

Only deterministic game commands may commit:
- money
- commission
- transaction lifecycle
- CRM lifecycle
- time advancement
- reputation/trust deltas
- task completion
- persisted state transitions

This boundary is required for reliable saves, tests, and fair gameplay.
