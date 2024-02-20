function tokenUntil(stream, state, untilRegExp) {
      if (stream.sol()) {
        for (var indent = 0; indent < state.indent; indent++) {
          if (!stream.eat(/\s/)) break;
        }
        if (indent) return null;
      }
      var oldString = stream.string;
      var match = untilRegExp.exec(oldString.substr(stream.pos));
      if (match) {
        // We don't use backUp because it backs up just the position, not the state.
        // This uses an undocumented API.
        stream.string = oldString.substr(0, stream.pos + match.index);
      }
      var result = stream.hideFirstChars(state.indent, function() {
        var localState = last(state.localStates);
        return localState.mode.token(stream, localState.state);
      });
      stream.string = oldString;
      return result;
    }