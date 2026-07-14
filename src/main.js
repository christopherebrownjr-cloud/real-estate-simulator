import './styles.css';

document.querySelector('#app').innerHTML = `
  <section class="shell" aria-labelledby="game-title">
    <header class="topbar">
      <div>
        <p class="eyebrow">CAREER SIMULATION</p>
        <h1 id="game-title">New Realtor Simulator</h1>
      </div>
      <span class="status" aria-label="Project status">Milestone 0</span>
    </header>
    <section class="welcome card">
      <p class="eyebrow">FOUNDATION BUILD</p>
      <h2>Your real-estate career starts here.</h2>
      <p>The application shell is ready. Core simulation systems will be activated as their rules are approved and tested.</p>
      <div class="actions">
        <button type="button" disabled>New Game</button>
        <button type="button" class="secondary" disabled>Load Game</button>
      </div>
      <p class="note">Gameplay is not enabled yet while the project completes its requirements audit.</p>
    </section>
  </section>
`;
