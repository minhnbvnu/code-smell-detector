function setRTL(instance) {
      if (!instance.__autoDirOptOut) {
        const el = /** @type {!HTMLElement} */(instance);
        el.setAttribute('dir', DOCUMENT_DIR);
      }
    }