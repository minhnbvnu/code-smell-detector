function runFinally(result, err) {
      if (!ran) {
        ran = true;
        if (!callback) {
          callback = passThrough;
        }
        var callbackResult = callback(result);
        if (looksLikeAPromise(callbackResult)) {
          return callbackResult.then(function () {
            if (err) {
              throw err;
            }
            return result;
          });
        } else {
          return result;
        }
      }
    }