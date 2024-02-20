function createDomEventHandler({
  key,
  object,
  callback,
  context
}) {
  return function domEventHandler(domEvent) {
    const originalEvent = domEvent.originalEvent || domEvent;
    // seempleTriggerArgs are created when DOM event is triggered by trigger method
    const triggerArgs = originalEvent.seempleTriggerArgs;
    const {
      which, target, ctrlKey, altKey
    } = domEvent;

    if (triggerArgs) {
      // if args are passed to trigger method then pass them to an event handler
      apply(callback, context, triggerArgs);
    } else {
      // use the following object as an arg for event handler
      callback.call(context, {
        self: object,
        node: this,
        preventDefault: () => domEvent.preventDefault(),
        stopPropagation: () => domEvent.stopPropagation(),
        key,
        domEvent,
        originalEvent,
        which,
        target,
        ctrlKey,
        altKey
      });
    }
  };
}