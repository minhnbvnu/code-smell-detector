function shouldIgnoreAttribute(name, propertyInfo, isCustomComponentTag) {
            if (propertyInfo !== null) {
              return propertyInfo.type === RESERVED;
            }
            if (isCustomComponentTag) {
              return false;
            }
            if (name.length > 2 && (name[0] === "o" || name[0] === "O") && (name[1] === "n" || name[1] === "N")) {
              return true;
            }
            return false;
          }