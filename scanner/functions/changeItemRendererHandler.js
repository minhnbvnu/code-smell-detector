function changeItemRendererHandler(eventOptions = {}) {
  const { forceRerender = true } = eventOptions;
  this.rerender({ forceRerender });
}