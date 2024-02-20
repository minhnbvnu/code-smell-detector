function actionsUnion(obj, eventName, otherActions) {
  var meta = obj[META_KEY],
      actions = meta && meta.listeners && meta.listeners[eventName];

  if (!actions) { return; }
  for (var i = actions.length - 3; i >= 0; i -= 3) {
    var target = actions[i],
        method = actions[i+1],
        flags = actions[i+2],
        actionIndex = indexOf(otherActions, target, method);

    if (actionIndex === -1) {
      otherActions.push(target, method, flags);
    }
  }
}