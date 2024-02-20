function validateProperty(tagName, name) {
              {
                if (hasOwnProperty.call(warnedProperties, name) && warnedProperties[name]) {
                  return true;
                }
                if (rARIACamel.test(name)) {
                  var ariaName = "aria-" + name.slice(4).toLowerCase();
                  var correctName = ariaProperties.hasOwnProperty(ariaName) ? ariaName : null;
                  if (correctName == null) {
                    error("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", name);
                    warnedProperties[name] = true;
                    return true;
                  }
                  if (name !== correctName) {
                    error("Invalid ARIA attribute `%s`. Did you mean `%s`?", name, correctName);
                    warnedProperties[name] = true;
                    return true;
                  }
                }
                if (rARIA.test(name)) {
                  var lowerCasedName = name.toLowerCase();
                  var standardName = ariaProperties.hasOwnProperty(lowerCasedName) ? lowerCasedName : null;
                  if (standardName == null) {
                    warnedProperties[name] = true;
                    return false;
                  }
                  if (name !== standardName) {
                    error("Unknown ARIA attribute `%s`. Did you mean `%s`?", name, standardName);
                    warnedProperties[name] = true;
                    return true;
                  }
                }
              }
              return true;
            }