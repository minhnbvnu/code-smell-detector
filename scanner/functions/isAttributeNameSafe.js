function isAttributeNameSafe(attributeName) {
              if (hasOwnProperty.call(validatedAttributeNameCache, attributeName)) {
                return true;
              }
              if (hasOwnProperty.call(illegalAttributeNameCache, attributeName)) {
                return false;
              }
              if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)) {
                validatedAttributeNameCache[attributeName] = true;
                return true;
              }
              illegalAttributeNameCache[attributeName] = true;
              {
                error("Invalid attribute name: `%s`", attributeName);
              }
              return false;
            }