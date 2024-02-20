function logAddEventListener$1(source) {
      var nativeAddEventListener = window.EventTarget.prototype.addEventListener;
      function addEventListenerWrapper(type, listener) {
        var _this$constructor;
        if (validateType(type) && validateListener(listener)) {
          var message = "addEventListener(\"".concat(type, "\", ").concat(listenerToString(listener), ")");
          logMessage(source, message, true);
          hit(source);
        } else {
          // logging while debugging
          var _message = "Invalid event type or listener passed to addEventListener:\n        type: ".concat(convertTypeToString(type), "\n        listener: ").concat(convertTypeToString(listener));
          logMessage(source, _message, true);
        }

        // Avoid illegal invocations due to lost context
        // https://github.com/AdguardTeam/Scriptlets/issues/271
        var context = this;
        if (this && ((_this$constructor = this.constructor) === null || _this$constructor === void 0 ? void 0 : _this$constructor.name) === 'Window' && this !== window) {
          context = window;
        }
        for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          args[_key - 2] = arguments[_key];
        }
        return nativeAddEventListener.apply(context, [type, listener, ...args]);
      }
      var descriptor = {
        configurable: true,
        set: function set() {},
        get: function get() {
          return addEventListenerWrapper;
        }
      };
      // https://github.com/AdguardTeam/Scriptlets/issues/215
      // https://github.com/AdguardTeam/Scriptlets/issues/143
      Object.defineProperty(window.EventTarget.prototype, 'addEventListener', descriptor);
      Object.defineProperty(window, 'addEventListener', descriptor);
      Object.defineProperty(document, 'addEventListener', descriptor);
    }