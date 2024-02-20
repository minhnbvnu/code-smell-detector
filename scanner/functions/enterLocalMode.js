function enterLocalMode(config, state, spec, token) {
    var pers;
    if (spec.persistent) { for (var p = state.persistentStates; p && !pers; p = p.next)
      { if (spec.spec ? cmp(spec.spec, p.spec) : spec.mode == p.mode) { pers = p; } } }
    var mode = pers ? pers.mode : spec.mode || CodeMirror.getMode(config, spec.spec);
    var lState = pers ? pers.state : CodeMirror.startState(mode);
    if (spec.persistent && !pers)
      { state.persistentStates = {mode: mode, spec: spec.spec, state: lState, next: state.persistentStates}; }

    state.localState = lState;
    state.local = {mode: mode,
                   end: spec.end && toRegex(spec.end),
                   endScan: spec.end && spec.forceEnd !== false && toRegex(spec.end, false),
                   endToken: token && token.join ? token[token.length - 1] : token};
  }