function trustedSetConstant(source, property, value, stack) {
        if (!property || !matchStackTrace(stack, new Error().stack)) {
          return;
        }
        var constantValue;
        try {
          constantValue = inferValue(value);
        } catch (e) {
          logMessage(source, e);
          return;
        }
        var canceled = false;
        var mustCancel = function mustCancel(value) {
          if (canceled) {
            return canceled;
          }
          canceled = value !== undefined && constantValue !== undefined && typeof value !== typeof constantValue && value !== null;
          return canceled;
        };
        var trapProp = function trapProp(base, prop, configurable, handler) {
          if (!handler.init(base[prop])) {
            return false;
          }
          var origDescriptor = Object.getOwnPropertyDescriptor(base, prop);
          var prevSetter;
          if (origDescriptor instanceof Object) {
            if (!origDescriptor.configurable) {
              var message = "Property '".concat(prop, "' is not configurable");
              logMessage(source, message);
              return false;
            }
            base[prop] = constantValue;
            if (origDescriptor.set instanceof Function) {
              prevSetter = origDescriptor.set;
            }
          }
          Object.defineProperty(base, prop, {
            configurable: configurable,
            get() {
              return handler.get();
            },
            set(a) {
              if (prevSetter !== undefined) {
                prevSetter(a);
              }
              handler.set(a);
            }
          });
          return true;
        };
        var setChainPropAccess = function setChainPropAccess(owner, property) {
          var chainInfo = getPropertyInChain(owner, property);
          var base = chainInfo.base;
          var prop = chainInfo.prop,
            chain = chainInfo.chain;
          var inChainPropHandler = {
            factValue: undefined,
            init(a) {
              this.factValue = a;
              return true;
            },
            get() {
              return this.factValue;
            },
            set(a) {
              if (this.factValue === a) {
                return;
              }
              this.factValue = a;
              if (a instanceof Object) {
                setChainPropAccess(a, chain);
              }
            }
          };
          var endPropHandler = {
            init(a) {
              if (mustCancel(a)) {
                return false;
              }
              return true;
            },
            get() {
              return constantValue;
            },
            set(a) {
              if (!mustCancel(a)) {
                return;
              }
              constantValue = a;
            }
          };
          if (!chain) {
            var isTrapped = trapProp(base, prop, false, endPropHandler);
            if (isTrapped) {
              hit(source);
            }
            return;
          }
          if (base !== undefined && base[prop] === null) {
            trapProp(base, prop, true, inChainPropHandler);
            return;
          }
          if ((base instanceof Object || typeof base === "object") && isEmptyObject(base)) {
            trapProp(base, prop, true, inChainPropHandler);
          }
          var propValue = owner[prop];
          if (propValue instanceof Object || typeof propValue === "object" && propValue !== null) {
            setChainPropAccess(propValue, chain);
          }
          trapProp(base, prop, true, inChainPropHandler);
        };
        setChainPropAccess(window, property);
      }