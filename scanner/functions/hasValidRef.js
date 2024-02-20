function hasValidRef(config) {
              {
                if (hasOwnProperty.call(config, "ref")) {
                  var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
                  if (getter && getter.isReactWarning) {
                    return false;
                  }
                }
              }
              return config.ref !== void 0;
            }