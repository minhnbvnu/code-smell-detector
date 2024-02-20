function createBindingHandlers({
  fullEventName,
  domEventHandler,
  selector
}) {
  return {
    bindHandler(evt = {}) {
      const { node } = evt;
      if (node) {
        dom.$(node).on(fullEventName, selector, domEventHandler);
      }
    },
    unbindHandler(evt = {}) {
      const { node } = evt;
      if (node) {
        dom.$(node).off(fullEventName, selector, domEventHandler);
      }
    }
  };
}