function GoogleAnalytics(source) {
      var _window$googleAnalyti;
      // eslint-disable-next-line func-names
      var Tracker = function Tracker() {}; // constructor
      var proto = Tracker.prototype;
      proto.get = noopFunc;
      proto.set = noopFunc;
      proto.send = noopFunc;
      var googleAnalyticsName = window.GoogleAnalyticsObject || 'ga';
      var queue = (_window$googleAnalyti = window[googleAnalyticsName]) === null || _window$googleAnalyti === void 0 ? void 0 : _window$googleAnalyti.q;

      // a -- fake arg for 'ga.length < 1' antiadblock checking
      // eslint-disable-next-line no-unused-vars
      function ga(a) {
        var len = arguments.length;
        if (len === 0) {
          return;
        }
        // eslint-disable-next-line prefer-rest-params
        var lastArg = arguments[len - 1];
        var replacer;
        if (lastArg instanceof Object && lastArg !== null && typeof lastArg.hitCallback === 'function') {
          replacer = lastArg.hitCallback;
        } else if (typeof lastArg === 'function') {
          // https://github.com/AdguardTeam/Scriptlets/issues/98
          replacer = function replacer() {
            lastArg(ga.create());
          };
        }
        try {
          setTimeout(replacer, 1);
          // eslint-disable-next-line no-empty
        } catch (ex) {}
      }
      ga.create = function () {
        return new Tracker();
      };
      // https://github.com/AdguardTeam/Scriptlets/issues/134
      ga.getByName = function () {
        return new Tracker();
      };
      ga.getAll = function () {
        return [new Tracker()];
      };
      ga.remove = noopFunc;
      ga.loaded = true;
      window[googleAnalyticsName] = ga;
      if (Array.isArray(queue)) {
        var push = function push(arg) {
          ga(...arg);
        };
        queue.push = push;
        queue.forEach(push);
      }
      var _window = window,
        dataLayer = _window.dataLayer,
        google_optimize = _window.google_optimize; // eslint-disable-line camelcase
      if (dataLayer instanceof Object === false) {
        return;
      }
      if (dataLayer.hide instanceof Object && typeof dataLayer.hide.end === 'function') {
        dataLayer.hide.end();
      }

      /**
       * checks data object and delays callback
       *
       * @param {object|Array} dataObj gtag payload
       * @param {string} funcName callback prop name
       */
      var handleCallback = function handleCallback(dataObj, funcName) {
        if (dataObj && typeof dataObj[funcName] === 'function') {
          setTimeout(dataObj[funcName]);
        }
      };
      if (typeof dataLayer.push === 'function') {
        dataLayer.push = function (data) {
          if (data instanceof Object) {
            handleCallback(data, 'eventCallback');
            // eslint-disable-next-line no-restricted-syntax, guard-for-in
            for (var key in data) {
              handleCallback(data[key], 'event_callback');
            }
            // eslint-disable-next-line no-prototype-builtins
            if (!data.hasOwnProperty('eventCallback') && !data.hasOwnProperty('eventCallback')) {
              [].push.call(window.dataLayer, data);
            }
          }
          if (Array.isArray(data)) {
            data.forEach(function (arg) {
              handleCallback(arg, 'callback');
            });
          }
          return noopFunc;
        };
      }

      // https://github.com/AdguardTeam/Scriptlets/issues/81
      // eslint-disable-next-line camelcase
      if (google_optimize instanceof Object && typeof google_optimize.get === 'function') {
        var googleOptimizeWrapper = {
          get: noopFunc
        };
        window.google_optimize = googleOptimizeWrapper;
      }
      hit(source);
    }