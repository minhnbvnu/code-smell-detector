function poll() {
    if (input.cm.state.focused) {
      input.pollSelection();
      input.polling.set(input.cm.options.pollInterval, poll);
    }
  }