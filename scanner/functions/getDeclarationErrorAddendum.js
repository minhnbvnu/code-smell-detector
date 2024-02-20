function getDeclarationErrorAddendum() {
              if (ReactCurrentOwner.current) {
                var name = getComponentNameFromType(ReactCurrentOwner.current.type);
                if (name) {
                  return "\n\nCheck the render method of `" + name + "`.";
                }
              }
              return "";
            }