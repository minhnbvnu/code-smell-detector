function reenableLogs() {
              {
                disabledDepth--;
                if (disabledDepth === 0) {
                  var props = {
                    configurable: true,
                    enumerable: true,
                    writable: true
                  };
                  Object.defineProperties(console, {
                    log: assign({}, props, {
                      value: prevLog
                    }),
                    info: assign({}, props, {
                      value: prevInfo
                    }),
                    warn: assign({}, props, {
                      value: prevWarn
                    }),
                    error: assign({}, props, {
                      value: prevError
                    }),
                    group: assign({}, props, {
                      value: prevGroup
                    }),
                    groupCollapsed: assign({}, props, {
                      value: prevGroupCollapsed
                    }),
                    groupEnd: assign({}, props, {
                      value: prevGroupEnd
                    })
                  });
                }
                if (disabledDepth < 0) {
                  error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
                }
              }
            }