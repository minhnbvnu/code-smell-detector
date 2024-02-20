function hijackAttachShadow(context, hostSelector, callback) {
        var handlerWrapper = function handlerWrapper(target, thisArg, args) {
          var shadowRoot = Reflect.apply(target, thisArg, args);
          if (thisArg && thisArg.matches(hostSelector || "*")) {
            callback(shadowRoot);
          }
          return shadowRoot;
        };
        var attachShadowHandler = {
          apply: handlerWrapper
        };
        context.Element.prototype.attachShadow = new Proxy(context.Element.prototype.attachShadow, attachShadowHandler);
      }