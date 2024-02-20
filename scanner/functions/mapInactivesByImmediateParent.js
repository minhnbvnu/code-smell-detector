function mapInactivesByImmediateParent() {
        var inactivesByAllParents ={};
        forEach(inactiveStates, function(state) {
          forEach(state.path, function(ancestor) {
            if (ancestor === state) return;
            inactivesByAllParents[ancestor.name] = inactivesByAllParents[ancestor.name] || [];
            inactivesByAllParents[ancestor.name].push(state);
          });
        });
        return inactivesByAllParents;
      }