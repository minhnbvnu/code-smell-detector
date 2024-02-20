function pushStartCustomElement(target, props, tag, responseState) {
              target.push(startChunkForTag(tag));
              var children = null;
              var innerHTML = null;
              for (var propKey in props) {
                if (hasOwnProperty.call(props, propKey)) {
                  var propValue = props[propKey];
                  if (propValue == null) {
                    continue;
                  }
                  switch (propKey) {
                    case "children":
                      children = propValue;
                      break;
                    case "dangerouslySetInnerHTML":
                      innerHTML = propValue;
                      break;
                    case "style":
                      pushStyle(target, responseState, propValue);
                      break;
                    case "suppressContentEditableWarning":
                    case "suppressHydrationWarning":
                      break;
                    default:
                      if (isAttributeNameSafe(propKey) && typeof propValue !== "function" && typeof propValue !== "symbol") {
                        target.push(attributeSeparator, stringToChunk(propKey), attributeAssign, stringToChunk(escapeTextForBrowser(propValue)), attributeEnd);
                      }
                      break;
                  }
                }
              }
              target.push(endOfStartTag);
              pushInnerHTML(target, innerHTML, children);
              return children;
            }