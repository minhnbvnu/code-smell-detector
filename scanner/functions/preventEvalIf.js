function preventEvalIf(source, search) {
        var searchRegexp = toRegExp(search);
        var nativeEval = window.eval;
        window.eval = function (payload) {
          if (!searchRegexp.test(payload.toString())) {
            return nativeEval.call(window, payload);
          }
          hit(source);
          return undefined;
        }.bind(window);
      }