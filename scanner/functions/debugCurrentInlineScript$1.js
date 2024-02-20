function debugCurrentInlineScript$1(source, property, search) {
      var searchRegexp = toRegExp(search);
      var rid = randomId();
      var getCurrentScript = function getCurrentScript() {
        if ('currentScript' in document) {
          return document.currentScript;
        }
        var scripts = document.getElementsByTagName('script');
        return scripts[scripts.length - 1];
      };
      var ourScript = getCurrentScript();
      var abort = function abort() {
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

        if (scriptEl instanceof HTMLScriptElement && content.length > 0 && scriptEl !== ourScript && searchRegexp.test(content)) {
          hit(source);
          debugger; // eslint-disable-line no-debugger
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
          logMessage(message, source.verbose);
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
        setPropertyAccess(base, prop, {
          set: function set(value) {
            abort();
            currentValue = value;
          },
          get: function get() {
            abort();
            return currentValue;
          }
        });
      };
      setChainPropAccess(window, property);
      window.onerror = createOnErrorHandler(rid).bind();
    }