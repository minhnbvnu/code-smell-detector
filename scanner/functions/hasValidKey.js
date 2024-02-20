function hasValidKey(config) {
              {
                if (hasOwnProperty.call(config, "key")) {
                  var getter = Object.getOwnPropertyDescriptor(config, "key").get;
                  if (getter && getter.isReactWarning) {
                    return false;
                  }
                }
              }
              return config.key !== void 0;
            }