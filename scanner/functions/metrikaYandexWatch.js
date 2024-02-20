function metrikaYandexWatch(source) {
      var cbName = 'yandex_metrika_callbacks';

      /**
       * Gets callback and its context from options and call it in async way
       *
       * @param {object} options Yandex Metrika API options
       */
      var asyncCallbackFromOptions = function asyncCallbackFromOptions() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var callback = options.callback;
        var ctx = options.ctx;
        if (typeof callback === 'function') {
          callback = ctx !== undefined ? callback.bind(ctx) : callback;
          setTimeout(function () {
            return callback();
          });
        }
      };
      function Metrika() {} // constructor
      Metrika.counters = noopArray;
      // Methods without options
      Metrika.prototype.addFileExtension = noopFunc;
      Metrika.prototype.getClientID = noopFunc;
      Metrika.prototype.setUserID = noopFunc;
      Metrika.prototype.userParams = noopFunc;
      Metrika.prototype.params = noopFunc;
      Metrika.prototype.counters = noopArray;

      // Methods with options
      // The order of arguments should be kept in according to API
      Metrika.prototype.extLink = function (url, options) {
        asyncCallbackFromOptions(options);
      };
      Metrika.prototype.file = function (url, options) {
        asyncCallbackFromOptions(options);
      };
      Metrika.prototype.hit = function (url, options) {
        asyncCallbackFromOptions(options);
      };
      Metrika.prototype.reachGoal = function (target, params, cb, ctx) {
        asyncCallbackFromOptions({
          callback: cb,
          ctx
        });
      };
      Metrika.prototype.notBounce = asyncCallbackFromOptions;
      if (window.Ya) {
        window.Ya.Metrika = Metrika;
      } else {
        window.Ya = {
          Metrika
        };
      }
      if (window[cbName] && Array.isArray(window[cbName])) {
        window[cbName].forEach(function (func) {
          if (typeof func === 'function') {
            func();
          }
        });
      }
      hit(source);
    }