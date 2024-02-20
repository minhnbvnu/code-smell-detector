function getElementKey(element, index) {
              if (typeof element === "object" && element !== null && element.key != null) {
                {
                  checkKeyStringCoercion(element.key);
                }
                return escape("" + element.key);
              }
              return index.toString(36);
            }