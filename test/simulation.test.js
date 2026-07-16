import test from 'node:test';
import assert from 'node:assert/strict';
import { activateDeal, advanceDay, closeDeal, completeAppointment, completeContact, convertOpportunity, convertToClient, createDeal, createNewGame, deserializeSave, enterEscrow, negotiateBrokerage, qualifyOpportunity, selectLead, serializeSave } from '../src/core/simulation.js';

function playableState() {
  let state = createNewGame('Test Realtor');
  state = qualifyOpportunity(state);
  state = convertOpportunity(state);
  state = completeContact(state);
  state = completeAppointment(state);
  state = convertToClient(state);
  return state;
}

test('first playable progression reaches an active deal', () => {
  const state = activateDeal(createDeal(playableState()));
  assert.equal(state.opportunity.status, 'Won');
  assert.equal(state.lead.status, 'Client');
  assert.equal(state.client.status, 'Active');
  assert.equal(state.deal.status, 'Active');
  assert.equal(state.player.gameHours, 4);
  assert.equal(state.player.trust, 61);
});

test('starter lead includes human-readable context', () => {
  const state = convertOpportunity(qualifyOpportunity(createNewGame()));
  assert.equal(state.lead.firstName, 'Jordan');
  assert.equal(state.lead.type, 'Buyer');
  assert.equal(state.lead.preferredContact, 'Phone');
});

test('contact method is recorded while preserving approved contact effects', () => {
  const state = completeContact(convertOpportunity(qualifyOpportunity(createNewGame())), 'Text');
  assert.equal(state.player.trust, 53);
  assert.match(state.activities.at(-1).message, /text contact/);
});

test('invalid progression is blocked', () => {
  assert.throws(() => convertOpportunity(createNewGame()), /qualified first/);
});

test('brokerage contract can be negotiated once within range', () => {
  const state = negotiateBrokerage(createNewGame(), 0.85);
  assert.equal(state.player.brokerageContract.playerShare, 0.85);
  assert.equal(state.player.brokerageContract.negotiated, true);
  assert.throws(() => negotiateBrokerage(state, 0.80), /already been negotiated/);
});

test('closing an escrow deal posts commission exactly once', () => {
  const active = activateDeal(createDeal(playableState()));
  const closed = closeDeal(enterEscrow(active));
  assert.equal(closed.deal.status, 'Closed');
  assert.equal(closed.client.status, 'Past Client');
  assert.equal(closed.ledger.length, 1);
  assert.equal(closed.ledger[0].amount, 8400);
  assert.equal(closed.player.cashBalance, 8400);
  assert.equal(closed.player.reputation, 53);
  assert.throws(() => closeDeal(closed), /Only escrow deals/);
});

test('save serialization detects tampering', () => {
  const serialized = serializeSave(createNewGame('Save Tester'));
  const envelope = JSON.parse(serialized);
  envelope.payload = envelope.payload.replace('Save Tester', 'Changed Name');
  assert.throws(() => deserializeSave(JSON.stringify(envelope)), /integrity validation/);
});

test('negotiated brokerage share is preserved through closing', () => {
  const negotiated = negotiateBrokerage(playableState(), 0.85);
  const closed = closeDeal(enterEscrow(activateDeal(createDeal(negotiated))));
  assert.equal(closed.deal.playerShare, 0.85);
  assert.equal(closed.ledger[0].amount, 10200);
  assert.equal(closed.player.cashBalance, 10200);
});

test('valid saves round-trip without changing state', () => {
  const original = playableState();
  const restored = deserializeSave(serializeSave(original));
  assert.deepEqual(restored, original);
});

test('future schema fixture is rejected by the version gate', () => {
  const envelope = JSON.parse(serializeSave(createNewGame('Future Schema Fixture')));
  const futurePayload = JSON.stringify({ schemaVersion: 2, state: JSON.parse(envelope.payload).state });
  envelope.payload = futurePayload;
  envelope.checksum = checksumForTest(futurePayload);
  assert.throws(() => deserializeSave(JSON.stringify(envelope)), /Save version is not supported/);
});

test('lead profile keeps an activity timeline and follow-up task', () => {
  const state = convertOpportunity(qualifyOpportunity(createNewGame()));
  assert.equal(state.leads.length, 3);
  assert.equal(state.lead.activity[0].type, 'LeadCreated');
  assert.equal(state.tasks[0].status, 'Open');
  const contacted = completeContact(state, 'Email');
  assert.equal(contacted.lead.activity.at(-1).type, 'Contact');
  assert.equal(contacted.activities.at(-1).relatedLeadId, contacted.lead.id);
});

test('advance day increments the calendar and marks overdue tasks', () => {
  const state = convertOpportunity(qualifyOpportunity(createNewGame()));
  const advanced = advanceDay(state);
  assert.equal(advanced.player.dayIndex, 1);
  assert.equal(advanced.player.gameHours, 8);
  assert.equal(advanced.tasks[0].status, 'Overdue');
});

test('new career includes selectable CRM lead profiles', () => {
  const state = createNewGame();
  assert.equal(state.leads.length, 2);
  const selected = selectLead(state, state.leads[0].id);
  assert.equal(selected.lead.firstName, 'Avery');
  assert.equal(selected.lead.type, 'Seller');
});

function checksumForTest(value) {
  let hash = 2166136261;
  for (const character of value) { hash ^= character.charCodeAt(0); hash = Math.imul(hash, 16777619); }
  return (hash >>> 0).toString(16);
}
