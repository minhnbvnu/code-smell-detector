function AcceptorStateMachine(states, state) {
  this.currentState = state || null;
  this.states = states || {};
}