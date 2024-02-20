function createMarkupForProperty(name, value) {
            var propertyInfo = getPropertyInfo(name);
            if (name !== "style" && shouldIgnoreAttribute(name, propertyInfo, false)) {
              return "";
            }
            if (shouldRemoveAttribute(name, value, propertyInfo, false)) {
              return "";
            }
            if (propertyInfo !== null) {
              var attributeName = propertyInfo.attributeName;
              var type = propertyInfo.type;
              if (type === BOOLEAN || type === OVERLOADED_BOOLEAN && value === true) {
                return attributeName + '=""';
              } else {
                if (propertyInfo.sanitizeURL) {
                  value = "" + value;
                  sanitizeURL(value);
                }
                return attributeName + "=" + quoteAttributeValueForBrowser(value);
              }
            } else if (isAttributeNameSafe(name)) {
              return name + "=" + quoteAttributeValueForBrowser(value);
            }
            return "";
          }