function getWrappedName(outerType, innerType, wrapperName) {
              var displayName = outerType.displayName;
              if (displayName) {
                return displayName;
              }
              var functionName = innerType.displayName || innerType.name || "";
              return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
            }