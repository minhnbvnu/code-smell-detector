function abortOnPropertyRead(source, property) {
        if (!property) {
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
          setPropertyAccess(base, prop, {
            get: abort,
            set: function set() {}
          });
        };
        setChainPropAccess(window, property);
        window.onerror = createOnErrorHandler(rid).bind();
      }