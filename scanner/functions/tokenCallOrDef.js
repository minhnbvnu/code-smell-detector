function tokenCallOrDef(stream, state) {
    for (;;) {
      var match = stream.match(/^(\(\s*)/), charsAdvanced = 0;
      if (match) {
        if (state.firstParenPos < 0)
          state.firstParenPos = state.scopes.length;
        state.scopes.push('(');
        charsAdvanced += match[1].length;
      }
      if (currentScope(state) == '(' && stream.match(/^\)/)) {
        state.scopes.pop();
        charsAdvanced += 1;
        if (state.scopes.length <= state.firstParenPos) {
          var isDefinition = stream.match(/^(\s*where\s+[^\s=]+)*\s*?=(?!=)/, false);
          stream.backUp(charsAdvanced);
          state.firstParenPos = -1;
          state.tokenize = tokenBase;
          if (isDefinition)
            return "def";
          return "builtin";
        }
      }
      // Unfortunately javascript does not support multiline strings, so we have
      // to undo anything done upto here if a function call or definition splits
      // over two or more lines.
      if (stream.match(/^$/g, false)) {
        stream.backUp(charsAdvanced);
        while (state.scopes.length > state.firstParenPos)
          state.scopes.pop();
        state.firstParenPos = -1;
        state.tokenize = tokenBase;
        return "builtin";
      }
      if (!stream.match(/^[^()]+/)) {
        stream.next()
        return null
      }
    }
  }