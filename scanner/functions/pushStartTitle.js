function pushStartTitle(target, props, responseState) {
              target.push(startChunkForTag("title"));
              var children = null;
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
                      throw new Error("`dangerouslySetInnerHTML` does not make sense on <title>.");
                    default:
                      pushAttribute(target, responseState, propKey, propValue);
                      break;
                  }
                }
              }
              target.push(endOfStartTag);
              {
                var child = Array.isArray(children) && children.length < 2 ? children[0] || null : children;
                if (Array.isArray(children) && children.length > 1) {
                  error("A title element received an array with more than 1 element as children. In browsers title Elements can only have Text Nodes as children. If the children being rendered output more than a single text node in aggregate the browser will display markup and comments as text in the title and hydration will likely fail and fall back to client rendering");
                } else if (child != null && child.$$typeof != null) {
                  error("A title element received a React element for children. In the browser title Elements can only have Text Nodes as children. If the children being rendered output more than a single text node in aggregate the browser will display markup and comments as text in the title and hydration will likely fail and fall back to client rendering");
                } else if (child != null && typeof child !== "string" && typeof child !== "number") {
                  error("A title element received a value that was not a string or number for children. In the browser title Elements can only have Text Nodes as children. If the children being rendered output more than a single text node in aggregate the browser will display markup and comments as text in the title and hydration will likely fail and fall back to client rendering");
                }
              }
              return children;
            }