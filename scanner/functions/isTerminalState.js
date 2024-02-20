function isTerminalState(machine) {
  return Object.prototype.hasOwnProperty.call(hardErrorStates, machine._asm.currentState);
}