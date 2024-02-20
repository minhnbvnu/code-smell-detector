function notifyBeforeObservers(obj, keyName) {
  if (obj.isDestroying) { return; }

  var eventName = keyName + ':before', listeners, diff;
  if (deferred) {
    listeners = beforeObserverSet.add(obj, keyName, eventName);
    diff = listenersDiff(obj, eventName, listeners);
    sendEvent(obj, eventName, [obj, keyName], diff);
  } else {
    sendEvent(obj, eventName, [obj, keyName]);
  }
}