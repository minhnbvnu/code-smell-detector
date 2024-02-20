function errorWrappedCallback(cb) {
  return function(e, v) {
    if (!cb)
      return;
    if (e) {
      try {
        chrome.runtime.lastError = new Error(e);
        if (cb) {
          cb();
        }
      }
      finally {
        delete chrome.runtime.lastError;
      }
    }
    else {
      cb(unremote(v));
    }
  }
}