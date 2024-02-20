function indentFunction(states, meta) {
    return function(state, textAfter, line) {
      if (state.local && state.local.mode.indent)
        { return state.local.mode.indent(state.localState, textAfter, line); }
      if (state.indent == null || state.local || meta.dontIndentStates && indexOf(state.state, meta.dontIndentStates) > -1)
        { return CodeMirror.Pass; }

      var pos = state.indent.length - 1, rules = states[state.state];
      scan: for (;;) {
        for (var i = 0; i < rules.length; i++) {
          var rule = rules[i];
          if (rule.data.dedent && rule.data.dedentIfLineStart !== false) {
            var m = rule.regex.exec(textAfter);
            if (m && m[0]) {
              pos--;
              if (rule.next || rule.push) { rules = states[rule.next || rule.push]; }
              textAfter = textAfter.slice(m[0].length);
              continue scan;
            }
          }
        }
        break;
      }
      return pos < 0 ? 0 : state.indent[pos];
    };
  }