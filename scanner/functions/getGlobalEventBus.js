function getGlobalEventBus(dispatchToDOM = false) {
  console.error("getGlobalEventBus is deprecated, use a manually created EventBus instance instead.");

  if (!globalEventBus) {
    globalEventBus = new EventBus({
      dispatchToDOM
    });
  }

  return globalEventBus;
}