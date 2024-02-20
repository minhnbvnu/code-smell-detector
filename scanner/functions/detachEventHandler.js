function detachEventHandler(eventHandler) {
      var elem = eventHandler.elem,
        type = eventHandler.type,
        fn = eventHandler.fn;
      if (elem.removeEventListener) elem.removeEventListener(type, fn, false);
      else if (elem.detachEvent) elem.detachEvent("on" + type, fn)
    }