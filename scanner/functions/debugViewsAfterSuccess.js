function debugViewsAfterSuccess($log, currentState, $state) {
        $log.debug("Current state: " + currentState.self.name + ", inactive states: ", map(_StickyState.getInactiveStates(), function (s) {
          return s.self.name;
        }));

        var statesOnly = function (local, name) {
          return name != 'globals' && name != 'resolve';
        };

        var viewsForState = function (state) {
          var viewLocals = filterObj(state.locals, statesOnly);

          if (!Object.keys(viewLocals).length) {
            viewLocals[''] = { $$state: { name: null } };
          }

          return map(viewLocals, function(local, name) {
            return {
              localsFor: state.self.name ? state.self.name : "(root)",
              uiViewName: name || null,
              filledByState: local.$$state.name
            };
          });
        };

        var viewsByState = viewsForState(currentState);
        var parent = currentState.parent;
        while (parent && parent !== currentState) {
          viewsByState = viewsByState.concat(viewsForState(parent));
          currentState = parent;
          parent = currentState.parent;
        }

        $log.debug("Views active on each state:");
        console.table(viewsByState.reverse());
      }