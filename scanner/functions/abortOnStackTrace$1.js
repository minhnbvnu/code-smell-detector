function abortOnStackTrace$1(source, property, stack) {
      if (!property || !stack) {
        return;
      }
      var rid = randomId();
      var abort = function abort() {
        hit(source);
        throw new ReferenceError(rid);
      };
      var setChainPropAccess = function setChainPropAccess(owner, property) {
        var chainInfo = getPropertyInChain(owner, property);
        var base = chainInfo.base;
        var prop = chainInfo.prop,
          chain = chainInfo.chain;
        if (chain) {
          var setter = function setter(a) {
            base = a;
            if (a instanceof Object) {
              setChainPropAccess(a, chain);
            }
          };
          Object.defineProperty(owner, prop, {
            get: function get() {
              return base;
            },
            set: setter
          });
          return;
        }
        if (!stack.match(/^(inlineScript|injectedScript)$/) && !isValidStrPattern(stack)) {
          logMessage(source, "Invalid parameter: ".concat(stack));
          return;
        }

        // Prevent infinite loops when trapping prop used by helpers in getter/setter
        var descriptorWrapper = Object.assign(getDescriptorAddon(), {
          value: base[prop],
          get() {
            if (!this.isAbortingSuspended && this.isolateCallback(matchStackTrace, stack, new Error().stack)) {
              abort();
            }
            return this.value;
          },
          set(newValue) {
            if (!this.isAbortingSuspended && this.isolateCallback(matchStackTrace, stack, new Error().stack)) {
              abort();
            }
            this.value = newValue;
          }
        });
        setPropertyAccess(base, prop, {
          // Call wrapped getter and setter to keep isAbortingSuspended & isolateCallback values
          get() {
            return descriptorWrapper.get.call(descriptorWrapper);
          },
          set(newValue) {
            descriptorWrapper.set.call(descriptorWrapper, newValue);
          }
        });
      };
      setChainPropAccess(window, property);
      window.onerror = createOnErrorHandler(rid).bind();
    }