export const SIMULATION_CONFIG = Object.freeze({
  startingTrust: 50,
  startingReputation: 50,
  trust: Object.freeze({ successfulContact: 3, completedAppointment: 8 }),
  reputation: Object.freeze({ closedTransaction: 3 }),
  timeCosts: Object.freeze({ contact: 2, appointment: 2, dealWork: 3 }),
  commission: Object.freeze({ ready: true, defaultRate: 0.03, defaultPlayerShare: 0.70, minPlayerShare: 0.50, maxPlayerShare: 0.90, currency: 'USD' }),
});
