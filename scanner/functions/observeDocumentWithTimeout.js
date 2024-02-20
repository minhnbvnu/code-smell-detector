function observeDocumentWithTimeout(callback) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
          subtree: true,
          childList: true
        };
        var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1e4;
        var documentObserver = new MutationObserver(function (mutations, observer) {
          observer.disconnect();
          callback(mutations, observer);
          observer.observe(document.documentElement, options);
        });
        documentObserver.observe(document.documentElement, options);
        if (typeof timeout === "number") {
          setTimeout(function () {
            return documentObserver.disconnect();
          }, timeout);
        }
      }