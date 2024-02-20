function onErrorCaptured(hook, target = currentInstance) {
    injectHook("ec", hook, target);
  }