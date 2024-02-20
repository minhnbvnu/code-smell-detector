function jsonpReq(url, callbackId, done) {
    // we can't use jQuery/jqLite here because jQuery does crazy stuff with script elements, e.g.:
    // - fetches local scripts via XHR and evals them
    // - adds and immediately removes script elements from the document
    var script = rawDocument.createElement('script'), callback = null;
    script.type = "text/javascript";
    script.src = url;
    script.async = true;

    callback = function(event) {
      removeEventListenerFn(script, "load", callback);
      removeEventListenerFn(script, "error", callback);
      rawDocument.body.removeChild(script);
      script = null;
      var status = -1;
      var text = "unknown";

      if (event) {
        if (event.type === "load" && !callbacks[callbackId].called) {
          event = { type: "error" };
        }
        text = event.type;
        status = event.type === "error" ? 404 : 200;
      }

      if (done) {
        done(status, text);
      }
    };

    addEventListenerFn(script, "load", callback);
    addEventListenerFn(script, "error", callback);
    rawDocument.body.appendChild(script);
    return callback;
  }