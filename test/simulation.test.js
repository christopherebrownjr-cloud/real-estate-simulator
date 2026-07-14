import test from 'node:test';
import assert from 'node:assert/strict';
import { activateDeal, completeAppointment, completeContact, convertOpportunity, convertToClient, createDeal, createNewGame, negotiateBrokerage, qualifyOpportunity } from '../src/core/simulation.js';

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

test('invalid progression is blocked', () => {
  assert.throws(() => convertOpportunity(createNewGame()), /qualified first/);
});

test('brokerage contract can be negotiated once within range', () => {
  const state = negotiateBrokerage(createNewGame(), 0.85);
  assert.equal(state.player.brokerageContract.playerShare, 0.85);
  assert.equal(state.player.brokerageContract.negotiated, true);
  assert.throws(() => negotiateBrokerage(state, 0.80), /already been negotiated/);
});
