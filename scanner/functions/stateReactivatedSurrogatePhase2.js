function stateReactivatedSurrogatePhase2(state) {
            var surrogate = angular.extend(new SurrogateState("reactivate_phase2"), state);
            var oldOnEnter = surrogate.self.onEnter;
            surrogate.resolve = {}; // Don't re-resolve when reactivating states (fixes issue #22)
            // TODO: Not 100% sure if this is necessary.  I think resolveState will load the views if I don't do this.
            surrogate.views = {}; // Don't re-activate controllers when reactivating states (fixes issue #22)
            surrogate.self.onEnter = function () {
              // ui-router sets locals on the surrogate to a blank locals (because we gave it nothing to resolve)
              // Re-set it back to the already loaded state.locals here.
              surrogate.locals = state.locals;
              _StickyState.stateReactivated(state);
            };
            restore.addRestoreFunction(function () {
              state.self.onEnter = oldOnEnter;
            });
            return surrogate;
          }