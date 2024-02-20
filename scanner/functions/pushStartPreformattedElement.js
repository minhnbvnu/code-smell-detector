function pushStartPreformattedElement(target, props, tag, responseState) {
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
              if (innerHTML != null) {
                if (children != null) {
                  throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
                }
                if (typeof innerHTML !== "object" || !("__html" in innerHTML)) {
                  throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
                }
                var html = innerHTML.__html;
                if (html !== null && html !== void 0) {
                  if (typeof html === "string" && html.length > 0 && html[0] === "\n") {
                    target.push(leadingNewline, stringToChunk(html));
                  } else {
                    {
                      checkHtmlStringCoercion(html);
                    }
                    target.push(stringToChunk("" + html));
                  }
                }
              }
              if (typeof children === "string" && children[0] === "\n") {
                target.push(leadingNewline);
              }
              return children;
            }