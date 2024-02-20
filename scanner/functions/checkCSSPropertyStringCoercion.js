function checkCSSPropertyStringCoercion(value, propName) {
              {
                if (willCoercionThrow(value)) {
                  error("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", propName, typeName(value));
                  return testStringCoercion(value);
                }
              }
            }