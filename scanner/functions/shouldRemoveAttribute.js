function shouldRemoveAttribute(name, value, propertyInfo, isCustomComponentTag) {
            if (value === null || typeof value === "undefined") {
              return true;
            }
            if (shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag)) {
              return true;
            }
            if (isCustomComponentTag) {
              return false;
            }
            if (propertyInfo !== null) {
              switch (propertyInfo.type) {
                case BOOLEAN:
                  return !value;
                case OVERLOADED_BOOLEAN:
                  return value === false;
                case NUMERIC:
                  return isNaN(value);
                case POSITIVE_NUMERIC:
                  return isNaN(value) || value < 1;
              }
            }
            return false;
          }