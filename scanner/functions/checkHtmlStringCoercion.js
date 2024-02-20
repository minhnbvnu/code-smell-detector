function checkHtmlStringCoercion(value) {
              {
                if (willCoercionThrow(value)) {
                  error("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
                  return testStringCoercion(value);
                }
              }
            }