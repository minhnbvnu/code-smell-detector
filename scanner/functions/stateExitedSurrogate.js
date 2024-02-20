function stateExitedSurrogate(state) {
            var oldOnExit = state.self.onExit;
            state.self.onExit = function () {
              _StickyState.stateExiting(state, exited, oldOnExit);
            };
            restore.addRestoreFunction(function () {
              state.self.onExit = oldOnExit;
            });

            return state;
          }