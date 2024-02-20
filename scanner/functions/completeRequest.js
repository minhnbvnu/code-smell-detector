function completeRequest(callback, status, response, headersString, statusText) {
      // cancel timeout and subsequent timeout promise resolution
      if (isDefined(timeoutId)) {
        $browserDefer.cancel(timeoutId);
      }
      jsonpDone = xhr = null;

      callback(status, response, headersString, statusText);
      $browser.$$completeOutstandingRequest(noop);
    }