import './styles.css';
import { completeAppointment, completeContact, convertOpportunity, convertToClient, createDeal, createNewGame, activateDeal, loadGame, qualifyOpportunity, saveGame } from './core/simulation.js';

let state = loadGame() ?? createNewGame();
let message = 'Starter opportunity ready.';

const hours = () => `${Math.floor(state.player.gameHours / 8)}d ${state.player.gameHours % 8}h`;
const action = (label, fn) => `<button data-action="${fn}">${label}</button>`;

function render() {
  document.querySelector('#app').innerHTML = `
    <section class="shell" aria-labelledby="game-title">
      <header class="topbar"><div><p class="eyebrow">CAREER SIMULATION</p><h1 id="game-title">New Realtor Simulator</h1></div><span class="status">First Playable</span></header>
      <section class="grid">
        <article class="card hero"><p class="eyebrow">CAREER DASHBOARD</p><h2>${state.player.displayName}</h2><p class="note">Starter scenario · ${hours()} elapsed</p><div class="metrics"><span><b>${state.player.trust}</b>Trust</span><span><b>${state.player.reputation}</b>Reputation</span><span><b>${state.lead?.score ?? '—'}</b>Lead score</span></div></article>
        <article class="card"><p class="eyebrow">OPPORTUNITY</p><h3>${state.opportunity.type} lead</h3><p>Status: <strong>${state.opportunity.status}</strong></p><div class="actions">${state.opportunity.status === 'Discovered' ? action('Qualify opportunity', 'qualify') : ''}${state.opportunity.status === 'Qualified' ? action('Win opportunity', 'convert') : ''}</div></article>
        <article class="card"><p class="eyebrow">CRM PROGRESSION</p><h3>${state.lead ? `Lead · ${state.lead.status}` : 'No lead yet'}</h3><div class="actions">${state.lead?.status === 'New' ? action('Complete contact', 'contact') : ''}${state.lead?.status === 'Connected' ? action('Complete appointment', 'appointment') : ''}${state.lead?.status === 'Appointment Scheduled' ? action('Convert to client', 'client') : ''}</div></article>
        <article class="card"><p class="eyebrow">DEAL WORKSPACE</p><h3>${state.deal ? `Deal · ${state.deal.status}` : 'No deal yet'}</h3><div class="actions">${state.client && !state.deal ? action('Create deal', 'deal') : ''}${state.deal?.status === 'Draft' ? action('Activate deal', 'activate') : ''}</div><p class="note">Closing and commission posting will activate after financial rules are approved.</p></article>
      </section>
      <section class="card feedback" role="status"><strong>${message}</strong><div class="actions">${action('Save game', 'save')} ${action('Load game', 'load')}</div></section>
    </section>`;
  document.querySelectorAll('[data-action]').forEach((button) => button.addEventListener('click', () => run(button.dataset.action)));
}

function run(name) {
  try {
    const operations = { qualify: qualifyOpportunity, convert: convertOpportunity, contact: completeContact, appointment: completeAppointment, client: convertToClient, deal: createDeal, activate: activateDeal };
    if (name === 'save') { saveGame(state); message = 'Game saved locally in this browser.'; }
    else if (name === 'load') { state = loadGame() ?? state; message = 'Saved game loaded.'; }
    else { state = operations[name](state); message = `${name} completed successfully.`; }
  } catch (error) { message = error.message; }
  render();
}

render();
