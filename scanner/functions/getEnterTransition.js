function getEnterTransition(state, stateParams, reloadStateTree, ancestorReloaded) {
        if (ancestorReloaded) return "reload";
        var inactiveState = inactiveStates[state.self.name];
        if (!inactiveState) return "enter";
        if (state.self === reloadStateTree) return "reload";
        var paramsMatch = paramsEqualForState(state.ownParams, stateParams, inactiveState.locals.globals.$stateParams);
        return paramsMatch ? "reactivate" : "reload";
      }