function addEventListenerWrapper(type, listener) {
          var _this$constructor;
          var shouldPrevent = false;
          if (validateType(type) && validateListener(listener)) {
            shouldPrevent = typeSearchRegexp.test(type.toString()) && listenerSearchRegexp.test(listenerToString(listener));
          }
          if (shouldPrevent) {
            hit(source);
            return undefined;
          }
          var context = this;
          if (this && ((_this$constructor = this.constructor) === null || _this$constructor === void 0 ? void 0 : _this$constructor.name) === "Window" && this !== window) {
            context = window;
          }
          for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            args[_key - 2] = arguments[_key];
          }
          return nativeAddEventListener.apply(context, [type, listener, ...args]);
        }