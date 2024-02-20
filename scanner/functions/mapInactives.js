function mapInactives() {
        var mappedStates = {};
        angular.forEach(inactiveStates, function (state, name) {
          var stickyAncestors = getStickyStateStack(state);
          for (var i = 0; i < stickyAncestors.length; i++) {
            var parent = stickyAncestors[i].parent;
            mappedStates[parent.name] = mappedStates[parent.name] || [];
            mappedStates[parent.name].push(state);
          }
          if (mappedStates['']) {
            // This is necessary to compute Transition.inactives when there are sticky states are children to root state.
            mappedStates['__inactives'] = mappedStates[''];  // jshint ignore:line
          }
        });
        return mappedStates;
      }