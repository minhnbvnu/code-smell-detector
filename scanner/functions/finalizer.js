function finalizer() {
    for (var i = 0, l = suspendedActions.length; i < l; i++) {
      var actionIndex = suspendedActions[i];
      actions[actionIndex+2] &= ~SUSPENDED;
    }
  }