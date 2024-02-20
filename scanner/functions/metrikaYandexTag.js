function metrikaYandexTag(source) {
      var asyncCallbackFromOptions = function asyncCallbackFromOptions(id, param) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var callback = options.callback;
        var ctx = options.ctx;
        if (typeof callback === 'function') {
          callback = ctx !== undefined ? callback.bind(ctx) : callback;
          setTimeout(function () {
            return callback();
          });
        }
      };

      /**
       * https://yandex.ru/support/metrica/objects/addfileextension.html
       */
      var addFileExtension = noopFunc;

      /**
       * https://yandex.ru/support/metrica/objects/extlink.html
       */
      var extLink = asyncCallbackFromOptions;

      /**
       * https://yandex.ru/support/metrica/objects/file.html
       */
      var file = asyncCallbackFromOptions;

      /**
       * https://yandex.ru/support/metrica/objects/get-client-id.html
       *
       * @param {string} id
       * @param {Function} cb
       */
      var getClientID = function getClientID(id, cb) {
        if (!cb) {
          return;
        }
        setTimeout(cb(null));
      };

      /**
       * https://yandex.ru/support/metrica/objects/hit.html
       */
      var hitFunc = asyncCallbackFromOptions;

      /**
       * https://yandex.ru/support/metrica/objects/notbounce.html
       */
      var notBounce = asyncCallbackFromOptions;

      /**
       * https://yandex.ru/support/metrica/objects/params-method.html
       */
      var params = noopFunc;

      /**
       * https://yandex.ru/support/metrica/objects/reachgoal.html
       *
       * @param {string} id
       * @param {string} target
       * @param {object} params
       * @param {Function} callback
       * @param {any} ctx
       */
      var reachGoal = function reachGoal(id, target, params, callback, ctx) {
        asyncCallbackFromOptions(null, null, {
          callback,
          ctx
        });
      };

      /**
       * https://yandex.ru/support/metrica/objects/set-user-id.html
       */
      var setUserID = noopFunc;

      /**
       * https://yandex.ru/support/metrica/objects/user-params.html
       */
      var userParams = noopFunc;

      // https://github.com/AdguardTeam/Scriptlets/issues/198
      var destruct = noopFunc;
      var api = {
        addFileExtension,
        extLink,
        file,
        getClientID,
        hit: hitFunc,
        notBounce,
        params,
        reachGoal,
        setUserID,
        userParams,
        destruct
      };
      function ym(id, funcName) {
        for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          args[_key - 2] = arguments[_key];
        }
        return api[funcName] && api[funcName](id, ...args);
      }
      function init(id) {
        // yaCounter object should provide api
        window["yaCounter".concat(id)] = api;
        document.dispatchEvent(new Event("yacounter".concat(id, "inited")));
      }
      if (typeof window.ym === 'undefined') {
        window.ym = ym;
        ym.a = [];
      } else if (window.ym && window.ym.a) {
        // Keep initial counters array intact
        ym.a = window.ym.a;
        window.ym = ym;
        window.ym.a.forEach(function (params) {
          var id = params[0];
          init(id);
        });
      }
      hit(source);
    }