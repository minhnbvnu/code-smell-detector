function setConstant(source, property, value) {
        var stack = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
        var valueWrapper = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";
        var setProxyTrap = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
        var uboAliases = ["set-constant.js", "ubo-set-constant.js", "set.js", "ubo-set.js", "ubo-set-constant", "ubo-set"];
        if (uboAliases.includes(source.name)) {
          if (stack.length !== 1 && !getNumberFromString(stack)) {
            valueWrapper = stack;
          }
          stack = undefined;
        }
        if (!property || !matchStackTrace(stack, new Error().stack)) {
          return;
        }
        var isProxyTrapSet = false;
        var emptyArr = noopArray();
        var emptyObj = noopObject();
        var constantValue;
        if (value === "undefined") {
          constantValue = undefined;
        } else if (value === "false") {
          constantValue = false;
        } else if (value === "true") {
          constantValue = true;
        } else if (value === "null") {
          constantValue = null;
        } else if (value === "emptyArr") {
          constantValue = emptyArr;
        } else if (value === "emptyObj") {
          constantValue = emptyObj;
        } else if (value === "noopFunc") {
          constantValue = noopFunc;
        } else if (value === "noopCallbackFunc") {
          constantValue = noopCallbackFunc;
        } else if (value === "trueFunc") {
          constantValue = trueFunc;
        } else if (value === "falseFunc") {
          constantValue = falseFunc;
        } else if (value === "throwFunc") {
          constantValue = throwFunc;
        } else if (value === "noopPromiseResolve") {
          constantValue = noopPromiseResolve;
        } else if (value === "noopPromiseReject") {
          constantValue = noopPromiseReject;
        } else if (/^\d+$/.test(value)) {
          constantValue = parseFloat(value);
          if (nativeIsNaN(constantValue)) {
            return;
          }
          if (Math.abs(constantValue) > 32767) {
            return;
          }
        } else if (value === "-1") {
          constantValue = -1;
        } else if (value === "") {
          constantValue = "";
        } else if (value === "yes") {
          constantValue = "yes";
        } else if (value === "no") {
          constantValue = "no";
        } else {
          return;
        }
        var valueWrapperNames = ["asFunction", "asCallback", "asResolved", "asRejected"];
        if (valueWrapperNames.includes(valueWrapper)) {
          var valueWrappersMap = {
            asFunction(v) {
              return function () {
                return v;
              };
            },
            asCallback(v) {
              return function () {
                return function () {
                  return v;
                };
              };
            },
            asResolved(v) {
              return Promise.resolve(v);
            },
            asRejected(v) {
              return Promise.reject(v);
            }
          };
          constantValue = valueWrappersMap[valueWrapper](constantValue);
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
            if (base[prop]) {
              base[prop] = constantValue;
            }
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
              if (a instanceof Object) {
                var propertiesToCheck = property.split(".").slice(1);
                if (setProxyTrap && !isProxyTrapSet) {
                  isProxyTrapSet = true;
                  a = new Proxy(a, {
                    get: function get(target, propertyKey, val) {
                      propertiesToCheck.reduce(function (object, currentProp, index, array) {
                        var currentObj = object === null || object === void 0 ? void 0 : object[currentProp];
                        if (currentObj && index === array.length - 1 && currentObj !== constantValue) {
                          object[currentProp] = constantValue;
                        }
                        return currentObj || object;
                      }, target);
                      return Reflect.get(target, propertyKey, val);
                    }
                  });
                }
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