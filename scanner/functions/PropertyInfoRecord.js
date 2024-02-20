function PropertyInfoRecord(name, type, mustUseProperty, attributeName, attributeNamespace, sanitizeURL2, removeEmptyString) {
              this.acceptsBooleans = type === BOOLEANISH_STRING || type === BOOLEAN || type === OVERLOADED_BOOLEAN;
              this.attributeName = attributeName;
              this.attributeNamespace = attributeNamespace;
              this.mustUseProperty = mustUseProperty;
              this.propertyName = name;
              this.type = type;
              this.sanitizeURL = sanitizeURL2;
              this.removeEmptyString = removeEmptyString;
            }