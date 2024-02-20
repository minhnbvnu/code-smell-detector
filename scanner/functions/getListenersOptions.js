function getListenersOptions(listeners, type, options) {
    var listenersByType = listeners[type];
    if (listenersByType === undefined) listeners[type] = listenersByType = [];
    var opts = typeof options === 'boolean' ? {
      capture: options
    } : options || {};
    var stringifiedOptions = JSON.stringify(opts);
    var listenersByTypeOptions = listenersByType.filter(function (obj) {
      return stringifiedOptions === JSON.stringify(obj.options);
    });
    return {
      listenersByTypeOptions: listenersByTypeOptions,
      options: opts,
      listenersByType: listenersByType
    };
  }