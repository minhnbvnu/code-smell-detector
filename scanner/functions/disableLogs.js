function disableLogs() {
              {
                if (disabledDepth === 0) {
                  prevLog = console.log;
                  prevInfo = console.info;
                  prevWarn = console.warn;
                  prevError = console.error;
                  prevGroup = console.group;
                  prevGroupCollapsed = console.groupCollapsed;
                  prevGroupEnd = console.groupEnd;
                  var props = {
                    configurable: true,
                    enumerable: true,
                    value: disabledLog,
                    writable: true
                  };
                  Object.defineProperties(console, {
                    info: props,
                    log: props,
                    warn: props,
                    error: props,
                    group: props,
                    groupCollapsed: props,
                    groupEnd: props
                  });
                }
                disabledDepth++;
              }
            }