function rerender(eventOptions = {}) {
  const { renderIfPossible = true } = this;
  if (renderIfPossible) {
    processRendering({
      self: this,
      eventOptions: {
        method: 'rerender',
        added: [],
        removed: [],
        ...eventOptions
      }
    });
  }

  return this;
}