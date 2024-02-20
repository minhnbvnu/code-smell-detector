function abortCurrentInlineScript$1(source, property, search) {
      var searchRegexp = toRegExp(search);
      var rid = randomId();
      var SRC_DATA_MARKER = 'data:text/javascript;base64,';
      var getCurrentScript = function getCurrentScript() {
        if ('currentScript' in document) {
          return document.currentScript;
        }
        var scripts = document.getElementsByTagName('script');
        return scripts[scripts.length - 1];
      };
      var ourScript = getCurrentScript();
      var abort = function abort() {
        var _scriptEl$src;
        var scriptEl = getCurrentScript();
        if (!scriptEl) {
          return;
        }
        var content = scriptEl.textContent;

        // We are using Node.prototype.textContent property descriptor
        // to get the real script content
        // even when document.currentScript.textContent is replaced.
        // https://github.com/AdguardTeam/Scriptlets/issues/57#issuecomment-593638991
        try {
          var textContentGetter = Object.getOwnPropertyDescriptor(Node.prototype, 'textContent').get;
          content = textContentGetter.call(scriptEl);
        } catch (e) {} // eslint-disable-line no-empty

        // https://github.com/AdguardTeam/Scriptlets/issues/130
        if (content.length === 0 && typeof scriptEl.src !== 'undefined' && (_scriptEl$src = scriptEl.src) !== null && _scriptEl$src !== void 0 && _scriptEl$src.startsWith(SRC_DATA_MARKER)) {
          var encodedContent = scriptEl.src.slice(SRC_DATA_MARKER.length);
          content = window.atob(encodedContent);
        }
        if (scriptEl instanceof HTMLScriptElement && content.length > 0 && scriptEl !== ourScript && searchRegexp.test(content)) {
          hit(source);
          throw new ReferenceError(rid);
        }
      };
      var setChainPropAccess = function setChainPropAccess(owner, property) {
        var chainInfo = getPropertyInChain(owner, property);
        var base = chainInfo.base;
        var prop = chainInfo.prop,
          chain = chainInfo.chain;

        // The scriptlet might be executed before the chain property has been created
        // (for instance, document.body before the HTML body was loaded).
        // In this case we're checking whether the base element exists or not
        // and if not, we simply exit without overriding anything.
        // e.g. https://github.com/AdguardTeam/Scriptlets/issues/57#issuecomment-575841092
        if (base instanceof Object === false && base === null) {
          var props = property.split('.');
          var propIndex = props.indexOf(prop);
          var baseName = props[propIndex - 1];
          var message = "The scriptlet had been executed before the ".concat(baseName, " was loaded.");
          logMessage(source, message);
          return;
        }
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
        var currentValue = base[prop];
        var origDescriptor = Object.getOwnPropertyDescriptor(base, prop);
        if (origDescriptor instanceof Object === false || origDescriptor.get instanceof Function === false) {
          currentValue = base[prop];
          origDescriptor = undefined;
        }
        var descriptorWrapper = Object.assign(getDescriptorAddon(), {
          currentValue,
          get() {
            if (!this.isAbortingSuspended) {
              this.isolateCallback(abort);
            }
            if (origDescriptor instanceof Object) {
              return origDescriptor.get.call(base);
            }
            return this.currentValue;
          },
          set(newValue) {
            if (!this.isAbortingSuspended) {
              this.isolateCallback(abort);
            }
            if (origDescriptor instanceof Object) {
              origDescriptor.set.call(base, newValue);
            } else {
              this.currentValue = newValue;
            }
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