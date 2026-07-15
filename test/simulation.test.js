import test from 'node:test';
import assert from 'node:assert/strict';
import { activateDeal, closeDeal, completeAppointment, completeContact, convertOpportunity, convertToClient, createDeal, createNewGame, deserializeSave, enterEscrow, negotiateBrokerage, qualifyOpportunity, serializeSave } from '../src/core/simulation.js';

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
