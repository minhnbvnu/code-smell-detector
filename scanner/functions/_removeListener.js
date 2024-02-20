function _removeListener(target, method) {
    var actions = actionsFor(obj, eventName),
        actionIndex = indexOf(actions, target, method);

    // action doesn't exist, give up silently
    if (actionIndex === -1) { return; }

    actions.splice(actionIndex, 3);

    if ('function' === typeof obj.didRemoveListener) {
      obj.didRemoveListener(eventName, target, method);
    }
  }