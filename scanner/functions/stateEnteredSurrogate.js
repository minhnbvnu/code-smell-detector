function stateEnteredSurrogate(state, toParams) {
            var oldOnEnter = state.self.onEnter;
            state.self.onEnter = function () {
              _StickyState.stateEntering(state, toParams, oldOnEnter);
            };
            restore.addRestoreFunction(function () {
              state.self.onEnter = oldOnEnter;
            });

            return state;
          }