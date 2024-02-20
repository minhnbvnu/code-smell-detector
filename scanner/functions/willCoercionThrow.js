function willCoercionThrow(value) {
              {
                try {
                  testStringCoercion(value);
                  return false;
                } catch (e) {
                  return true;
                }
              }
            }