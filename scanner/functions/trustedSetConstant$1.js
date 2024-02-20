function trustedSetConstant$1(source, property, value, stack) {
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

      /**
       * Safely sets property on a given object
       *
       * IMPORTANT! this duplicates corresponding func in set-constant scriptlet as
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
          base[prop] = constantValue;
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
       * IMPORTANT! this duplicates corresponding func in set-constant scriptlet as
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