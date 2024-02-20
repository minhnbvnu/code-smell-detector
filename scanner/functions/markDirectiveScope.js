function markDirectiveScope(directives, isolateScope, newScope) {
      for (var j = 0, jj = directives.length; j < jj; j++) {
        directives[j] = inherit(directives[j], {$$isolateScope: isolateScope, $$newScope: newScope});
      }
    }