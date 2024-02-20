function ensureState(states, name) {
    if (!states.hasOwnProperty(name))
      { throw new Error("Undefined state " + name + " in simple mode"); }
  }