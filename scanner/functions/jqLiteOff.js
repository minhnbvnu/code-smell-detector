function jqLiteOff(element, type, fn, unsupported) {
  if (isDefined(unsupported)) throw jqLiteMinErr('offargs', 'jqLite#off() does not support the `selector` argument');

  var expandoStore = jqLiteExpandoStore(element);
  var events = expandoStore && expandoStore.events;
  var handle = expandoStore && expandoStore.handle;

  if (!handle) return; //no listeners registered

  if (!type) {
    for (type in events) {
      if (type !== '$destroy') {
        removeEventListenerFn(element, type, handle);
      }
      delete events[type];
    }
  } else {

    var removeHandler = function(type) {
      var listenerFns = events[type];
      if (isDefined(fn)) {
        arrayRemove(listenerFns || [], fn);
      }
      if (!(isDefined(fn) && listenerFns && listenerFns.length > 0)) {
        removeEventListenerFn(element, type, handle);
        delete events[type];
      }
    };

    forEach(type.split(' '), function(type) {
      removeHandler(type);
      if (MOUSE_EVENT_MAP[type]) {
        removeHandler(MOUSE_EVENT_MAP[type]);
      }
    });
  }
}