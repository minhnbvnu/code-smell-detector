function checkKeyStringCoercion(value) {
              {
                if (willCoercionThrow(value)) {
                  error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
                  return testStringCoercion(value);
                }
              }
            }