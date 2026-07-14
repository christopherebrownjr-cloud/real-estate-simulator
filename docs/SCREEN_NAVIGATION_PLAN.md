# First Playable Screen and Navigation Plan

## Primary navigation

- Dashboard
- Opportunities
- Leads
- Appointments & Tasks
- Clients
- Deals
- Financial Ledger
- Activity & Notifications
- Save / Load

## Entry flow

New Game / Player Setup → Dashboard → Opportunity Inbox → Opportunity Detail → Lead CRM → Lead Contact → Appointment → Client Detail → Deal Workspace → Closing Confirmation → Financial Ledger.

## Navigation rules

- The dashboard is the default landing screen after loading a save.
- Entity detail screens open from cards and preserve the selected entity ID in route state.
- Invalid actions remain visible but disabled or explain their unmet guard conditions.
- Save/load is available from the global shell.
- Notifications and activity history are accessible globally.
- No screen owns simulation rules; screens dispatch commands to core services.

## Required screen states

Every screen must define loading, empty, populated, validation, error, disabled, and keyboard-focus behavior. Status cannot rely on color alone.

## Build order

1. Application shell and navigation state
2. New Game / Player Setup
3. Dashboard
4. Opportunity Inbox and Detail
5. Lead CRM and Contact
6. Appointments & Tasks
7. Client Detail
8. Deal Workspace and Closing Confirmation
9. Financial Ledger
10. Activity, Notifications, and Save / Load
