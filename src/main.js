import './styles.css';
import { closeDeal, completeAppointment, completeContact, convertOpportunity, convertToClient, createDeal, createNewGame, activateDeal, enterEscrow, loadGame, negotiateBrokerage, qualifyOpportunity, saveGame } from './core/simulation.js';

let state = loadGame() ?? createNewGame();
let message = 'Starter opportunity ready.';
let screen = 'dashboard';

const hours = () => `${Math.floor(state.player.gameHours / 8)}d ${state.player.gameHours % 8}h`;
const action = (label, fn) => `<button data-action="${fn}">${label}</button>`;
const navItems = [['dashboard', 'Dashboard'], ['opportunities', 'Opportunities'], ['leads', 'Leads'], ['appointments', 'Appointments & Tasks'], ['clients', 'Clients'], ['deals', 'Deals'], ['ledger', 'Financial Ledger'], ['activity', 'Activity & Notifications'], ['save', 'Save / Load']];

function screenContent() {
  if (screen === 'dashboard') return `<section class="grid">
    <article class="card hero"><p class="eyebrow">CAREER DASHBOARD</p><h2>${state.player.displayName}</h2><p class="note">Starter scenario · ${hours()} elapsed</p><div class="metrics"><span><b>${state.player.trust}</b>Trust</span><span><b>${state.player.reputation}</b>Reputation</span><span><b>${state.lead?.score ?? '—'}</b>Lead score</span><span><b>$${(state.player.cashBalance ?? 0).toLocaleString()}</b>Cash</span></div></article>
    <article class="card"><p class="eyebrow">TODAY</p><h3>Next recommended action</h3><p>${state.lead ? `Continue the lead: ${state.lead.status}.` : 'Review and qualify your starter opportunity.'}</p><button data-screen="${state.lead ? 'leads' : 'opportunities'}">Open workspace</button></article>
    <article class="card"><p class="eyebrow">CAREER STATUS</p><h3>Brokerage contract</h3><p>Player share: <strong>${Math.round(state.player.brokerageContract.playerShare * 100)}%</strong></p><p class="note">One-time negotiation ${state.player.brokerageContract.negotiated ? 'complete' : 'available'}.</p></article>
  </section>`;
  if (screen === 'opportunities') return `<section class="card page"><p class="eyebrow">OPPORTUNITIES</p><h2>Opportunity Inbox</h2><p>Review potential business and move qualified opportunities into your CRM.</p><div class="entity-row"><strong>${state.opportunity.type} opportunity</strong><span class="badge">${state.opportunity.status}</span></div><div class="actions">${state.opportunity.status === 'Discovered' ? action('Qualify opportunity', 'qualify') : ''}${state.opportunity.status === 'Qualified' ? action('Win opportunity', 'convert') : ''}</div></section>`;
  if (screen === 'leads') return `<section class="card page"><p class="eyebrow">CRM</p><h2>Lead CRM</h2>${state.lead ? `<div class="entity-row"><strong>Starter lead</strong><span class="badge">${state.lead.status}</span></div><p>Trust: ${state.lead.trust} · Score: ${state.lead.score}</p><div class="actions">${state.lead.status === 'New' ? action('Complete contact', 'contact') : ''}${state.lead.status === 'Connected' ? action('Complete appointment', 'appointment') : ''}${state.lead.status === 'Appointment Scheduled' ? action('Convert to client', 'client') : ''}</div>` : '<p class="note">No leads yet. Win an opportunity to create your first lead.</p>'}</section>`;
  if (screen === 'appointments') return `<section class="card page"><p class="eyebrow">SCHEDULE</p><h2>Appointments & Tasks</h2><p>${state.lead?.status === 'Appointment Scheduled' || state.client ? 'Appointment completed for the starter lead.' : 'Appointments and tasks will appear here as the CRM progresses.'}</p></section>`;
  if (screen === 'clients') return `<section class="card page"><p class="eyebrow">CLIENTS</p><h2>Client Portfolio</h2>${state.client ? `<div class="entity-row"><strong>Starter client</strong><span class="badge">${state.client.status}</span></div><p>Relationship trust: ${state.client.trust}</p>` : '<p class="note">No clients yet. Complete the lead milestones to create one.</p>'}</section>`;
  if (screen === 'deals') return `<section class="card page"><p class="eyebrow">TRANSACTIONS</p><h2>Deal Workspace</h2>${state.deal ? `<div class="entity-row"><strong>Starter residential deal</strong><span class="badge">${state.deal.status}</span></div><p>Purchase price: $${state.deal.purchasePrice.toLocaleString()} · Commission rate: 3%</p><div class="actions">${state.deal.status === 'Draft' ? action('Activate deal', 'activate') : ''}${state.deal.status === 'Active' ? action('Enter escrow', 'escrow') : ''}${state.deal.status === 'Escrow' ? action('Close deal', 'close') : ''}</div>` : `${state.client ? `<div class="actions">${action('Create deal', 'deal')}</div>` : '<p class="note">No deal yet. Convert a lead into a client first.</p>'}`}</section>`;
  if (screen === 'ledger') return `<section class="card page"><p class="eyebrow">FINANCE</p><h2>Financial Ledger</h2>${state.ledger.length ? state.ledger.map((entry) => `<div class="entity-row"><strong>${entry.type}</strong><span>$${entry.amount.toFixed(2)} ${entry.currency}</span></div>`).join('') : '<p class="note">No financial transactions yet. A successful close will post commission here.</p>'}</section>`;
  if (screen === 'activity') return `<section class="card page"><p class="eyebrow">HISTORY</p><h2>Activity & Notifications</h2>${state.activities.length ? state.activities.slice().reverse().map((item) => `<div class="entity-row"><span>${item.message}</span><span class="note">${item.gameHours}h</span></div>`).join('') : '<p class="note">No activity recorded yet.</p>'}<h3 class="subheading">Notifications</h3>${state.notifications.map((item) => `<div class="entity-row"><span>${item.message}</span><span class="badge">${item.read ? 'Read' : 'New'}</span></div>`).join('')}</section>`;
  return `<section class="card page"><p class="eyebrow">PERSISTENCE</p><h2>Save / Load</h2><p>Saves are stored locally in this browser.</p><div class="actions">${action('Save game', 'save')} ${action('Load game', 'load')}</div><p class="note">${message}</p></section>`;
}

function render() {
  document.querySelector('#app').innerHTML = `
    <section class="shell" aria-labelledby="game-title">
      <header class="topbar"><div><p class="eyebrow">CAREER SIMULATION</p><h1 id="game-title">New Realtor Simulator</h1></div><span class="status">First Playable</span></header>
      <nav class="nav" aria-label="Primary navigation">${navItems.map(([key, label]) => `<button class="nav-button ${screen === key ? 'active' : ''}" data-screen="${key}">${label}</button>`).join('')}</nav>
      <main>${screenContent()}</main>
      <section class="card feedback" role="status"><strong>${message}</strong></section>
    </section>`;
  document.querySelectorAll('[data-screen]').forEach((button) => button.addEventListener('click', () => { screen = button.dataset.screen; render(); }));
  document.querySelectorAll('[data-action]').forEach((button) => button.addEventListener('click', () => run(button.dataset.action)));
}

function run(name) {
  try {
    const operations = { qualify: qualifyOpportunity, convert: convertOpportunity, contact: completeContact, appointment: completeAppointment, client: convertToClient, deal: createDeal, activate: activateDeal, escrow: enterEscrow, close: closeDeal };
    if (name === 'save') { saveGame(state); message = 'Game saved locally in this browser.'; }
    else if (name === 'load') { state = loadGame() ?? state; message = 'Saved game loaded.'; }
    else if (name === 'negotiate') { const requested = window.prompt('Choose your player share (50-90):', String(Math.round(state.player.brokerageContract.playerShare * 100))); state = negotiateBrokerage(state, Number(requested) / 100); message = 'Brokerage contract negotiated.'; }
    else { state = operations[name](state); message = `${name} completed successfully.`; }
  } catch (error) { message = error.message; }
  render();
}

render();
