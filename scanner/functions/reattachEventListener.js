function reattachEventListener(el, evt) {
      const handler = el[`on${evt}`];
      if (handler != null) {
        el[`_on${evt}`] = handler;
      }
    }