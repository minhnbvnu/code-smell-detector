    return function(stream, state) {
      if (state.pending) {
        var pend = state.pending.shift();
        if (state.pending.length == 0) { state.pending = null; }
        stream.pos += pend.text.length;
        return pend.token;
      }

      if (state.local) {
        if (state.local.end && stream.match(state.local.end)) {
          var tok = state.local.endToken || null;
          state.local = state.localState = null;
          return tok;
        } else {
          var tok = state.local.mode.token(stream, state.localState), m;
          if (state.local.endScan && (m = state.local.endScan.exec(stream.current())))
            { stream.pos = stream.start + m.index; }
          return tok;
        }
      }

      var curState = states[state.state];
      for (var i = 0; i < curState.length; i++) {
        var rule = curState[i];
        var matches = (!rule.data.sol || stream.sol()) && stream.match(rule.regex);
        if (matches) {
          if (rule.data.next) {
            state.state = rule.data.next;
          } else if (rule.data.push) {
            (state.stack || (state.stack = [])).push(state.state);
            state.state = rule.data.push;
          } else if (rule.data.pop && state.stack && state.stack.length) {
            state.state = state.stack.pop();
          }

          if (rule.data.mode)
            { enterLocalMode(config, state, rule.data.mode, rule.token); }
          if (rule.data.indent)
            { state.indent.push(stream.indentation() + config.indentUnit); }
          if (rule.data.dedent)
            { state.indent.pop(); }
          if (matches.length > 2) {
            state.pending = [];
            for (var j = 2; j < matches.length; j++)
              { if (matches[j])
                { state.pending.push({text: matches[j], token: rule.token[j - 1]}); } }
            stream.backUp(matches[0].length - (matches[1] ? matches[1].length : 0));
            return rule.token[0];
          } else if (rule.token && rule.token.join) {
            return rule.token[0];
          } else {
            return rule.token;
          }
        }
      }
      stream.next();
      return null;
    };