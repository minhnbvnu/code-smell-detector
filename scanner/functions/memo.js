function memo(type, compare) {
              {
                if (!isValidElementType(type)) {
                  error("memo: The first argument must be a component. Instead received: %s", type === null ? "null" : typeof type);
                }
              }
              var elementType = {
                $$typeof: REACT_MEMO_TYPE,
                type,
                compare: compare === void 0 ? null : compare
              };
              {
                var ownName;
                Object.defineProperty(elementType, "displayName", {
                  enumerable: false,
                  configurable: true,
                  get: function() {
                    return ownName;
                  },
                  set: function(name) {
                    ownName = name;
                    if (!type.name && !type.displayName) {
                      type.displayName = name;
                    }
                  }
                });
              }
              return elementType;
            }