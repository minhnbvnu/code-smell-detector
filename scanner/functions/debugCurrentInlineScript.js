function debugCurrentInlineScript(source, property, search) {
        var searchRegexp = toRegExp(search);
        var rid = randomId();
        var getCurrentScript = function getCurrentScript() {
          if ("currentScript" in document) {
            return document.currentScript;
          }
          var scripts = document.getElementsByTagName("script");
          return scripts[scripts.length - 1];
        };
        var ourScript = getCurrentScript();
        var abort = function abort() {
          var scriptEl = getCurrentScript();
          if (!scriptEl) {
            return;
          }
          var content = scriptEl.textContent;
          try {
            var textContentGetter = Object.getOwnPropertyDescriptor(Node.prototype, "textContent").get;
            content = textContentGetter.call(scriptEl);
          } catch (e) {}
          if (scriptEl instanceof HTMLScriptElement && content.length > 0 && scriptEl !== ourScript && searchRegexp.test(content)) {
            hit(source);
            debugger;
          }
        };
        var setChainPropAccess = function setChainPropAccess(owner, property) {
          var chainInfo = getPropertyInChain(owner, property);
          var base = chainInfo.base;
          var prop = chainInfo.prop,
            chain = chainInfo.chain;
          if (base instanceof Object === false && base === null) {
            var props = property.split(".");
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