function popCommand(state) {
      var plug = state.cmdState.pop();
      if (plug) {
        plug.closeBracket();
      }
    }