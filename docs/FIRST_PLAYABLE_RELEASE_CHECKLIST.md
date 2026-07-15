# First Playable Release Checklist

## Build and deployment

- [x] Production build succeeds
- [x] Dependencies locked
- [x] GitHub Actions deploys successfully
- [x] GitHub Pages URL returns 200
- [x] JavaScript asset loads
- [x] CSS asset loads

## Core gameplay

- [x] New career can be created
- [x] Opportunity can be qualified and won
- [x] Lead contact advances time and trust
- [x] Appointment advances trust
- [x] Lead converts to client
- [x] Deal activates and enters escrow
- [x] Closing confirmation precedes close
- [x] Commission posts once
- [x] Ledger reconciles player net

## Persistence

- [x] Browser-local save/load
- [x] Versioned save envelope
- [x] Integrity checksum
- [x] Tamper detection
- [x] JSON export/import backup
- [ ] Crash recovery save
- [ ] Migration test across schema versions

## Quality

- [x] Core automated tests pass
- [x] Keyboard focus styling
- [x] Navigation current-state semantics
- [ ] Screen-reader review
- [ ] Full browser smoke test
- [ ] Mobile layout review
- [ ] Visual design integration review

## Release gate

The First Playable is not release-complete until all unchecked persistence and quality items are verified.
