function warnInvalidARIAProps(type, props) {
              {
                var invalidProps = [];
                for (var key in props) {
                  var isValid = validateProperty(type, key);
                  if (!isValid) {
                    invalidProps.push(key);
                  }
                }
                var unknownPropString = invalidProps.map(function(prop) {
                  return "`" + prop + "`";
                }).join(", ");
                if (invalidProps.length === 1) {
                  error("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", unknownPropString, type);
                } else if (invalidProps.length > 1) {
                  error("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", unknownPropString, type);
                }
              }
            }