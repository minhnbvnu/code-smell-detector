function sortSolutions(states) {
    return states.sort(function(a, b) {
      if (a.types.stars !== b.types.stars) { return a.types.stars - b.types.stars; }

      if (a.types.stars) {
        if (a.types.statics !== b.types.statics) { return b.types.statics - a.types.statics; }
        if (a.types.dynamics !== b.types.dynamics) { return b.types.dynamics - a.types.dynamics; }
      }

      if (a.types.dynamics !== b.types.dynamics) { return a.types.dynamics - b.types.dynamics; }
      if (a.types.statics !== b.types.statics) { return b.types.statics - a.types.statics; }

      return 0;
    });
  }