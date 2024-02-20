function defineRefPropWarningGetter(props, displayName) {
              var warnAboutAccessingRef = function() {
                {
                  if (!specialPropRefWarningShown) {
                    specialPropRefWarningShown = true;
                    error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
                  }
                }
              };
              warnAboutAccessingRef.isReactWarning = true;
              Object.defineProperty(props, "ref", {
                get: warnAboutAccessingRef,
                configurable: true
              });
            }