function checkAttributeStringCoercion(value, attributeName) {
              {
                if (willCoercionThrow(value)) {
                  error("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", attributeName, typeName(value));
                  return testStringCoercion(value);
                }
              }
            }