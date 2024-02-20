function attachEventHandler(elem, type, fn) {
      if (elem.addEventListener) elem.addEventListener(type, fn, false);
      else elem.attachEvent("on" + type, fn);
      eventHandlers.push({
        elem: elem,
        type: type,
        fn: fn
      })
    }