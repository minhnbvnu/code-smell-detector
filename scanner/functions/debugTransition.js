function debugTransition($log, currentTransition, stickyTransition) {
        function message(path, index, state) {
          return (path[index] ? path[index].toUpperCase() + ": " + state.self.name : "(" + state.self.name + ")");
        }

        var inactiveLogVar = map(stickyTransition.inactives, function (state) {
          return state.self.name;
        });
        var enterLogVar = map(currentTransition.toState.path, function (state, index) {
          return message(stickyTransition.enter, index, state);
        });
        var exitLogVar = map(currentTransition.fromState.path, function (state, index) {
          return message(stickyTransition.exit, index, state);
        });

        var transitionMessage = currentTransition.fromState.self.name + ": " +
          angular.toJson(currentTransition.fromParams) + ": " +
          " -> " +
          currentTransition.toState.self.name + ": " +
          angular.toJson(currentTransition.toParams);

        $log.debug("------------------------------------------------------");
        $log.debug("   Current transition: ", transitionMessage);
        $log.debug("Before transition, inactives are:   : ", map(_StickyState.getInactiveStates(), function (s) {
          return s.self.name;
        }));
        $log.debug("After transition,  inactives will be: ", inactiveLogVar);
        $log.debug("Transition will exit:  ", exitLogVar);
        $log.debug("Transition will enter: ", enterLogVar);
      }