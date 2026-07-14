export const SIMULATION_CONFIG = Object.freeze({
  startingTrust: 50,
  startingReputation: 50,
  trust: Object.freeze({ successfulContact: 3, completedAppointment: 8 }),
  reputation: Object.freeze({ closedTransaction: 3 }),
  timeCosts: Object.freeze({ contact: 2, appointment: 2, dealWork: 3 }),
  commission: Object.freeze({ ready: false }),
});
