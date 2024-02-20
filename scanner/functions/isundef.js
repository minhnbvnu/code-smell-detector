function isundef(scope, code, token, a) {
    if (!state.ignored[code] && state.option.undef !== false) {
      JSHINT.undefs.push([scope, code, token, a]);
    }
  }