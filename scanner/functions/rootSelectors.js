function rootSelectors() {
  return rootSelectorCallbacks.map((fn) => fn());
}