function pushAttribute(target, responseState, name, value) {
              switch (name) {
                case "style": {
                  pushStyle(target, responseState, value);
                  return;
                }
                case "defaultValue":
                case "defaultChecked":
                case "innerHTML":
                case "suppressContentEditableWarning":
                case "suppressHydrationWarning":
                  return;
              }
              if (
                // shouldIgnoreAttribute
                // We have already filtered out null/undefined and reserved words.
                name.length > 2 && (name[0] === "o" || name[0] === "O") && (name[1] === "n" || name[1] === "N")
              ) {
                return;
              }
              var propertyInfo = getPropertyInfo(name);
              if (propertyInfo !== null) {
                switch (typeof value) {
                  case "function":
                  case "symbol":
                    return;
                  case "boolean": {
                    if (!propertyInfo.acceptsBooleans) {
                      return;
                    }
                  }
                }
                var attributeName = propertyInfo.attributeName;
                var attributeNameChunk = stringToChunk(attributeName);
                switch (propertyInfo.type) {
                  case BOOLEAN:
                    if (value) {
                      target.push(attributeSeparator, attributeNameChunk, attributeEmptyString);
                    }
                    return;
                  case OVERLOADED_BOOLEAN:
                    if (value === true) {
                      target.push(attributeSeparator, attributeNameChunk, attributeEmptyString);
                    } else if (value === false)
                      ;
                    else {
                      target.push(attributeSeparator, attributeNameChunk, attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
                    }
                    return;
                  case NUMERIC:
                    if (!isNaN(value)) {
                      target.push(attributeSeparator, attributeNameChunk, attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
                    }
                    break;
                  case POSITIVE_NUMERIC:
                    if (!isNaN(value) && value >= 1) {
                      target.push(attributeSeparator, attributeNameChunk, attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
                    }
                    break;
                  default:
                    if (propertyInfo.sanitizeURL) {
                      {
                        checkAttributeStringCoercion(value, attributeName);
                      }
                      value = "" + value;
                      sanitizeURL(value);
                    }
                    target.push(attributeSeparator, attributeNameChunk, attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
                }
              } else if (isAttributeNameSafe(name)) {
                switch (typeof value) {
                  case "function":
                  case "symbol":
                    return;
                  case "boolean": {
                    var prefix2 = name.toLowerCase().slice(0, 5);
                    if (prefix2 !== "data-" && prefix2 !== "aria-") {
                      return;
                    }
                  }
                }
                target.push(attributeSeparator, stringToChunk(name), attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
              }
            }