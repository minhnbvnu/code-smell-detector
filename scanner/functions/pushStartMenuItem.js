function pushStartMenuItem(target, props, responseState) {
              target.push(startChunkForTag("menuitem"));
              for (var propKey in props) {
                if (hasOwnProperty.call(props, propKey)) {
                  var propValue = props[propKey];
                  if (propValue == null) {
                    continue;
                  }
                  switch (propKey) {
                    case "children":
                    case "dangerouslySetInnerHTML":
                      throw new Error("menuitems cannot have `children` nor `dangerouslySetInnerHTML`.");
                    default:
                      pushAttribute(target, responseState, propKey, propValue);
                      break;
                  }
                }
              }
              target.push(endOfStartTag);
              return null;
            }