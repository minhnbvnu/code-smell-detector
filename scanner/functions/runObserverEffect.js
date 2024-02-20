function runObserverEffect(inst, property, props, oldProps, info) {
    let fn = typeof info.method === "string" ? inst[info.method] : info.method;
    let changedProp = info.property;
    if (fn) {
      fn.call(inst, inst.__data[changedProp], oldProps[changedProp]);
    } else if (!info.dynamicFn) {
      console.warn('observer method `' + info.method + '` not defined');
    }
  }