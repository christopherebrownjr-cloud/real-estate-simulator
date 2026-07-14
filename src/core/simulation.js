import { SIMULATION_CONFIG } from './config.js';

const SAVE_KEY = 'new-realtor-simulator/save-v1';

const id = (prefix) => `${prefix}-${crypto.randomUUID()}`;

export function createNewGame(displayName = 'New Realtor') {
  return {
    version: 1,
    player: { id: id('player'), displayName, trust: SIMULATION_CONFIG.startingTrust, reputation: SIMULATION_CONFIG.startingReputation, gameHours: 0, brokerageContract: { playerShare: SIMULATION_CONFIG.commission.defaultPlayerShare, negotiated: false } },
    opportunity: { id: id('opportunity'), status: 'Discovered', source: 'Starter Scenario', type: 'Residential', convertedLeadId: null },
    lead: null,
    client: null,
    deal: null,
    activities: [],
    notifications: [{ id: id('notification'), message: 'A new opportunity is waiting.', read: false }],
  };
}

function record(state, type, message, hours = 0) {
  return { ...state, player: { ...state.player, gameHours: state.player.gameHours + hours }, activities: [...state.activities, { id: id('activity'), type, message, gameHours: state.player.gameHours + hours }] };
}

export function qualifyOpportunity(state) {
  if (state.opportunity.status !== 'Discovered') throw new Error('Only discovered opportunities can be qualified.');
  return { ...state, opportunity: { ...state.opportunity, status: 'Qualified' } };
}

export function convertOpportunity(state) {
  if (state.opportunity.status !== 'Qualified') throw new Error('The opportunity must be qualified first.');
  const lead = { id: id('lead'), status: 'New', trust: SIMULATION_CONFIG.startingTrust, score: 0 };
  return { ...state, opportunity: { ...state.opportunity, status: 'Won', convertedLeadId: lead.id }, lead };
}

export function completeContact(state) {
  if (!state.lead || !['New', 'Attempting Contact'].includes(state.lead.status)) throw new Error('The lead is not ready for contact.');
  const next = record(state, 'LeadContactCompleted', 'Successful contact completed.', SIMULATION_CONFIG.timeCosts.contact);
  return { ...next, player: { ...next.player, trust: Math.min(100, next.player.trust + SIMULATION_CONFIG.trust.successfulContact) }, lead: { ...next.lead, status: 'Connected', trust: Math.min(100, next.lead.trust + SIMULATION_CONFIG.trust.successfulContact), score: 20 } };
}

export function completeAppointment(state) {
  if (!state.lead || state.lead.status !== 'Connected') throw new Error('Successful contact is required before the appointment.');
  const next = record(state, 'AppointmentCompleted', 'Appointment completed.', SIMULATION_CONFIG.timeCosts.appointment);
  return { ...next, player: { ...next.player, trust: Math.min(100, next.player.trust + SIMULATION_CONFIG.trust.completedAppointment) }, lead: { ...next.lead, status: 'Appointment Scheduled', trust: Math.min(100, next.lead.trust + SIMULATION_CONFIG.trust.completedAppointment), score: 40 } };
}

export function convertToClient(state) {
  if (!state.lead || state.lead.status !== 'Appointment Scheduled') throw new Error('A completed appointment is required before client conversion.');
  const client = { id: id('client'), originatingLeadId: state.lead.id, status: 'Active', trust: state.lead.trust };
  return { ...state, lead: { ...state.lead, status: 'Client' }, client };
}

export function createDeal(state) {
  if (!state.client || state.client.status !== 'Active') throw new Error('An active client is required before creating a deal.');
  return { ...state, deal: { id: id('deal'), status: 'Draft', clientId: state.client.id } };
}

export function activateDeal(state) {
  if (!state.deal || state.deal.status !== 'Draft') throw new Error('Only draft deals can be activated.');
  return { ...state, deal: { ...state.deal, status: 'Active' } };
}

export function negotiateBrokerage(state, requestedShare) {
  if (state.player.brokerageContract.negotiated) throw new Error('The brokerage contract has already been negotiated.');
  const share = Number(requestedShare);
  if (!Number.isFinite(share) || share < SIMULATION_CONFIG.commission.minPlayerShare || share > SIMULATION_CONFIG.commission.maxPlayerShare) throw new Error('Choose a player share between 50% and 90%.');
  return { ...state, player: { ...state.player, brokerageContract: { playerShare: share, negotiated: true } } };
}

export function saveGame(state) { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); return state; }
export function loadGame() { const raw = localStorage.getItem(SAVE_KEY); return raw ? JSON.parse(raw) : null; }
export function getSaveKey() { return SAVE_KEY; }
