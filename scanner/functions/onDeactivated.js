function onDeactivated(hook, target) {
    registerKeepAliveHook(hook, "da", target);
  }