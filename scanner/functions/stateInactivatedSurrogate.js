function stateInactivatedSurrogate(state) {
            var surrogate = new SurrogateState("inactivate");
            surrogate.self = state.self;
            var oldOnExit = state.self.onExit;
            surrogate.self.onExit = function () {
              _StickyState.stateInactivated(state);
            };
            restore.addRestoreFunction(function () {
              state.self.onExit = oldOnExit;
            });
            return surrogate;
          }