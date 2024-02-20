function tokenInterpolation(stream, state, parentTokenize) {
    if (stream.match('$(')) {
      var savedBracketNesting = state.bracketNesting;
      state.returnStack.push({
        /*jshint loopfunc:true */
        shouldReturnFrom: function(state) {
          return state.bracketNesting === savedBracketNesting;
        },
        tokenize: parentTokenize
      });
      state.tokenize = tokenBase;
      state.bracketNesting += 1;
      return 'punctuation';
    } else {
      stream.next();
      state.returnStack.push({
        shouldReturnFrom: function() { return true; },
        tokenize: parentTokenize
      });
      state.tokenize = tokenVariable;
      return state.tokenize(stream, state);
    }
  }