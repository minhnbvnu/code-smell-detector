function createNodeEventHandler(context, eventName, methodName) {
    // Instances can optionally have a _methodHost which allows redirecting where
    // to find methods. Currently used by `templatize`.
    context = context._methodHost || context;
    let handler = function(e) {
      if (context[methodName]) {
        context[methodName](e, e.detail);
      } else {
        console.warn('listener method `' + methodName + '` not defined');
      }
    };
    return handler;
  }