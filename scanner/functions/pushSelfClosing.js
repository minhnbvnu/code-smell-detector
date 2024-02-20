function pushSelfClosing(target, props, tag, responseState) {
              target.push(startChunkForTag(tag));
              for (var propKey in props) {
                if (hasOwnProperty.call(props, propKey)) {
                  var propValue = props[propKey];
                  if (propValue == null) {
                    continue;
                  }
                  switch (propKey) {
                    case "children":
                    case "dangerouslySetInnerHTML":
                      throw new Error(tag + " is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
                    default:
                      pushAttribute(target, responseState, propKey, propValue);
                      break;
                  }
                }
              }
              target.push(endOfStartTagSelfClosing);
              return null;
            }