function createMarkupForCustomAttribute(name, value) {
            if (!isAttributeNameSafe(name) || value == null) {
              return "";
            }
            return name + "=" + quoteAttributeValueForBrowser(value);
          }