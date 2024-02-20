function createRef() {
              var refObject = {
                current: null
              };
              {
                Object.seal(refObject);
              }
              return refObject;
            }