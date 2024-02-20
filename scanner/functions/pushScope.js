function pushScope(stream, state, type) {
      var offset = 0, align = null;
      if (type == "py") {
        while (top(state).type != "py")
          state.scopes.pop();
      }
      offset = top(state).offset + (type == "py" ? conf.indentUnit : hangingIndent);
      if (type != "py" && !stream.match(/^(\s|#.*)*$/, false))
        align = stream.column() + 1;
      state.scopes.push({offset: offset, type: type, align: align});
    }