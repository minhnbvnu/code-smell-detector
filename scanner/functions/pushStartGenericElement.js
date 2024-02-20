function pushStartGenericElement(target, props, tag, responseState) {
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
                    default:
                      pushAttribute(target, responseState, propKey, propValue);
                      break;
                  }
                }
              }
              target.push(endOfStartTag);
              pushInnerHTML(target, innerHTML, children);
              if (typeof children === "string") {
                target.push(stringToChunk(encodeHTMLTextNode(children)));
                return null;
              }
              return children;
            }