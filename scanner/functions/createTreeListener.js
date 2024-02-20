function createTreeListener({ handler, restPath }) {
  const newHandler = function treeListener(changeEvent) {
    const extendedChangeEvent = {
      restPath,
      ...changeEvent
    };
    const { previousValue, value } = changeEvent;

    // removes listener for all branches of the path on old object
    if (previousValue && typeof previousValue === 'object') {
      removeTreeListener(previousValue, restPath, handler);
    }

    // adds listener for all branches of "restPath" path on newly assigned object
    if (value && typeof value === 'object') {
      addTreeListener(value, restPath, handler);
    }

    // call original handler
    handler.call(this, extendedChangeEvent);
  };

  newHandler._callback = handler;

  return newHandler;
}