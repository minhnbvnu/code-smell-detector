function ruby(stream, state) {
      return rubyMode.token(stream, state.rubyState);
    }