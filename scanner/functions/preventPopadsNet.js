function preventPopadsNet(source) {
        var rid = randomId();
        var throwError = function throwError() {
          throw new ReferenceError(rid);
        };
        delete window.PopAds;
        delete window.popns;
        Object.defineProperties(window, {
          PopAds: {
            set: throwError
          },
          popns: {
            set: throwError
          }
        });
        window.onerror = createOnErrorHandler(rid).bind();
        hit(source);
      }