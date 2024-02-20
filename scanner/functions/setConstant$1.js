function setConstant$1(source, property, value) {
      var stack = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
      var valueWrapper = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
      var setProxyTrap = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
      var uboAliases = ['set-constant.js', 'ubo-set-constant.js', 'set.js', 'ubo-set.js', 'ubo-set-constant', 'ubo-set'];

      /**
       * UBO set-constant analog has it's own args sequence:
       * (property, value, defer | wrapper)
       * 'defer' – a stringified number, which defines execution time, or
       * 'wrapper' - string which defines value wrapper name
       *
       * joysound.com##+js(set, document.body.oncopy, null, 3)
       * kompetent.de##+js(set, Object.keys, 42, asFunction)
       */
      if (uboAliases.includes(source.name)) {
        /**
         * Check that third argument was intended as 'valueWrapper' argument,
         * by excluding 'defer' single digits case, and move it to 'valueWrapper'
         */
        if (stack.length !== 1 && !getNumberFromString(stack)) {
          valueWrapper = stack;
        }
        /**
         * ubo doesn't support 'stack', while adg doesn't support 'defer'
         * that goes in the same spot, so we discard it
         */
        stack = undefined;
      }
      if (!property || !matchStackTrace(stack, new Error().stack)) {
        return;
      }
      var isProxyTrapSet = false;
      var emptyArr = noopArray();
      var emptyObj = noopObject();
      var constantValue;
      if (value === 'undefined') {
        constantValue = undefined;
      } else if (value === 'false') {
        constantValue = false;
      } else if (value === 'true') {
        constantValue = true;
      } else if (value === 'null') {
        constantValue = null;
      } else if (value === 'emptyArr') {
        constantValue = emptyArr;
      } else if (value === 'emptyObj') {
        constantValue = emptyObj;
      } else if (value === 'noopFunc') {
        constantValue = noopFunc;
      } else if (value === 'noopCallbackFunc') {
        constantValue = noopCallbackFunc;
      } else if (value === 'trueFunc') {
        constantValue = trueFunc;
      } else if (value === 'falseFunc') {
        constantValue = falseFunc;
      } else if (value === 'throwFunc') {
        constantValue = throwFunc;
      } else if (value === 'noopPromiseResolve') {
        constantValue = noopPromiseResolve;
      } else if (value === 'noopPromiseReject') {
        constantValue = noopPromiseReject;
      } else if (/^\d+$/.test(value)) {
        constantValue = parseFloat(value);
        if (nativeIsNaN(constantValue)) {
          return;
        }
        if (Math.abs(constantValue) > 32767) {
          return;
        }
      } else if (value === '-1') {
        constantValue = -1;
      } else if (value === '') {
        constantValue = '';
      } else if (value === 'yes') {
        constantValue = 'yes';
      } else if (value === 'no') {
        constantValue = 'no';
      } else {
        return;
      }
      var valueWrapperNames = ['asFunction', 'asCallback', 'asResolved', 'asRejected'];
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

      /**
       * Safely sets property on a given object
       *
       * IMPORTANT! this duplicates corresponding func in trusted-set-constant scriptlet as
       * reorganizing this to common helpers will most definitely complicate debugging
       *
       * @param {object} base arbitrary reachable object
       * @param {string} prop property name
       * @param {boolean} configurable if set property should be configurable
       * @param {object} handler custom property descriptor object
       * @returns {boolean} true if prop was trapped successfully
       */
      var trapProp = function trapProp(base, prop, configurable, handler) {
        if (!handler.init(base[prop])) {
          return false;
        }
        var origDescriptor = Object.getOwnPropertyDescriptor(base, prop);
        var prevSetter;
        // This is required to prevent scriptlets overwrite each over
        if (origDescriptor instanceof Object) {
          // This check is required to avoid defining non-configurable props
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
          configurable,
          get() {
            return handler.get();
          },
          set(a) {
            if (prevSetter !== undefined) {
              prevSetter(a);
            }
            // Set a proxy trap to observe changes
            // This is a partial fix and only works with a single scriptlet,
            // a full fix requires synchronisation between the scriptlets
            // TODO: add proper fix when synchronisation between scriptlets is added
            // https://github.com/AdguardTeam/Scriptlets/issues/330
            if (a instanceof Object) {
              // Get properties which should be checked and remove first one
              // because it's current object
              var propertiesToCheck = property.split('.').slice(1);
              if (setProxyTrap && !isProxyTrapSet) {
                isProxyTrapSet = true;
                a = new Proxy(a, {
                  get: function get(target, propertyKey, val) {
                    // Check if object contains required property, if so
                    // check if current value is equal to constantValue, if not, set it to constantValue
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

      /**
       * Traverses given chain to set constant value to its end prop
       * Chains that yet include non-object values (e.g null) are valid and will be
       * traversed when appropriate chain member is set by an external script
       *
       * IMPORTANT! this duplicates corresponding func in trusted-set-constant scriptlet as
       * reorganizing this to common helpers will most definitely complicate debugging
       *
       * @param {object} owner object that owns chain
       * @param {string} property chain of owner properties
       */
      var setChainPropAccess = function setChainPropAccess(owner, property) {
        var chainInfo = getPropertyInChain(owner, property);
        var base = chainInfo.base;
        var prop = chainInfo.prop,
          chain = chainInfo.chain;

        // Handler method init is used to keep track of factual value
        // and apply mustCancel() check only on end prop
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
            // Prevent breakage due to loop assignments like win.obj = win.obj
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

        // End prop case
        if (!chain) {
          var isTrapped = trapProp(base, prop, false, endPropHandler);
          if (isTrapped) {
            hit(source);
          }
          return;
        }

        // Null prop in chain
        if (base !== undefined && base[prop] === null) {
          trapProp(base, prop, true, inChainPropHandler);
          return;
        }

        // Empty object prop in chain
        if ((base instanceof Object || typeof base === 'object') && isEmptyObject(base)) {
          trapProp(base, prop, true, inChainPropHandler);
        }

        // Defined prop in chain
        var propValue = owner[prop];
        if (propValue instanceof Object || typeof propValue === 'object' && propValue !== null) {
          setChainPropAccess(propValue, chain);
        }

        // Undefined prop in chain
        trapProp(base, prop, true, inChainPropHandler);
      };
      setChainPropAccess(window, property);
    }