function _createForOfIteratorHelper(o, allowArrayLike) {
      var it2 = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
      if (!it2) {
        if (Array.isArray(o) || (it2 = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
          if (it2)
            o = it2;
          var i = 0;
          var F2 = function F3() {
          };
          return { s: F2, n: function n2() {
            if (i >= o.length)
              return { done: true };
            return { done: false, value: o[i++] };
          }, e: function e(_e2) {
            throw _e2;
          }, f: F2 };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      var normalCompletion = true, didErr = false, err;
      return { s: function s() {
        it2 = it2.call(o);
      }, n: function n2() {
        var step = it2.next();
        normalCompletion = step.done;
        return step;
      }, e: function e(_e3) {
        didErr = true;
        err = _e3;
      }, f: function f() {
        try {
          if (!normalCompletion && it2.return != null)
            it2.return();
        } finally {
          if (didErr)
            throw err;
        }
      } };
    }