function getInactivatedState(state, stateParams) {
        var inactiveState = inactiveStates[state.name];
        if (!inactiveState) return null;
        if (!stateParams) return inactiveState;
        var paramsMatch = paramsEqualForState(state.ownParams, stateParams, inactiveState.locals.globals.$stateParams);
        return paramsMatch ? inactiveState : null;
      }