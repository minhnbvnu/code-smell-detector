function tokenLexer(stream, state) {
    if (stream.sol()) { state.indentCount = 0; }
    var style = state.tokenizer(stream, state);
    var current = stream.current();

    if (current === "@return" || current === "}"){
      dedent(state);
    }

    if (style !== null) {
      var startOfToken = stream.pos - current.length;

      var withCurrentIndent = startOfToken + (config.indentUnit * state.indentCount);

      var newScopes = [];

      for (var i = 0; i < state.scopes.length; i++) {
        var scope = state.scopes[i];

        if (scope.offset <= withCurrentIndent)
          { newScopes.push(scope); }
      }

      state.scopes = newScopes;
    }


    return style;
  }