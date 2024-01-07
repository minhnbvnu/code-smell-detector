constructor(initialState = new EvalState()) {
    this.state = initialState;
    this.stateStack = [];
  }