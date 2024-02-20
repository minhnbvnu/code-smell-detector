function shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag) {
              if (propertyInfo !== null && propertyInfo.type === RESERVED) {
                return false;
              }
              switch (typeof value) {
                case "function":
                case "symbol":
                  return true;
                case "boolean": {
                  if (isCustomComponentTag) {
                    return false;
                  }
                  if (propertyInfo !== null) {
                    return !propertyInfo.acceptsBooleans;
                  } else {
                    var prefix2 = name.toLowerCase().slice(0, 5);
                    return prefix2 !== "data-" && prefix2 !== "aria-";
                  }
                }
                default:
                  return false;
              }
            }