function calcTreeChanges(transition) {
        var fromPath = transition.fromState.path;
        var toPath = transition.toState.path;
        var toParams = transition.toParams;
        var keep = 0, state = toPath[keep];

        if (transition.options && transition.options.inherit) {
          toParams = transition.toParams =
              inheritParams($stateParams, toParams || {}, $state.$current, transition.toState);
        }

        while (state && state === fromPath[keep] && paramsEqualForState(state.ownParams, toParams, transition.fromParams)) {
          // We're "keeping" this state. bump keep var and get the next state in toPath for the next iteration.
          state = toPath[++keep];
        }

        return {
          keep: keep,
          retained: fromPath.slice(0, keep),
          exiting: fromPath.slice(keep),
          entering: toPath.slice(keep)
        };
      }