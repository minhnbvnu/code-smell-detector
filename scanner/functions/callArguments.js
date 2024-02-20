function callArguments(stream, state) {
    if (state.mixinCallAfter) {
      state.mixinCallAfter = false;
      if (!stream.match(/^\( *[-\w]+ *=/, false)) {
        state.javaScriptArguments = true;
        state.javaScriptArgumentsDepth = 0;
      }
      return true;
    }
  }