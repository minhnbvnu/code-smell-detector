function runMethodEffect(inst, property, props, oldProps, info) {
    // Instances can optionally have a _methodHost which allows redirecting where
    // to find methods. Currently used by `templatize`.
    let context = inst._methodHost || inst;
    let fn = context[info.methodName];
    if (fn) {
      let args = inst._marshalArgs(info.args, property, props);
      return fn.apply(context, args);
    } else if (!info.dynamicFn) {
      console.warn('method `' + info.methodName + '` not defined');
    }
  }