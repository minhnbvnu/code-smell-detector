function createNodeHandler({
  object,
  key,
  node,
  propDef,
  binder,
  bindingOptions
}) {
  return function nodeHandler(domEvent = {}) {
    // nodeHandler.disabled = true is set in unbindNode
    // we cannot "turn off" binder.on when its value is a function
    // developer needs to clean memory ("turn off" callback) manualy in binder.destroy
    if (nodeHandler.disabled) {
      return;
    }

    const previousValue = propDef.value;
    const {
      which, target, ctrlKey, altKey
    } = domEvent;
    const { getValue } = binder;
    const value = getValue.call(node, {
      previousValue,
      domEvent,
      originalEvent: domEvent.originalEvent || domEvent, // jQuery thing
      // will throw "preventDefault is not a function" when domEvent is empty object
      preventDefault: () => domEvent.preventDefault(),
      // will throw "stopPropagation is not a function" when domEvent is empty object
      stopPropagation: () => domEvent.stopPropagation(),
      which,
      target,
      ctrlKey,
      altKey,
      ...bindingOptions
    });

    if (!is(value, previousValue)) {
      set(object, key, value, {
        fromNode: true,
        // the following properties are needed to avoid circular changes
        // they are used at objectHandler
        changedNode: node,
        onChangeValue: value,
        binder
      });
    }
  };
}