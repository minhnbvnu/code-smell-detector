function BackgroundActivity (doAction) {
      var action = Cell(LazyValue.pure({}));
      var start = function (value) {
        var future = LazyValue.nu(function (callback) {
          return doAction(value).get(callback);
        });
        action.set(future);
      };
      var idle = function (g) {
        action.get().get(function () {
          g();
        });
      };
      return {
        start: start,
        idle: idle
      };
    }