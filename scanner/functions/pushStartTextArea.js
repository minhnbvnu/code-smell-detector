function pushStartTextArea(target, props, responseState) {
              {
                checkControlledValueProps("textarea", props);
                if (props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultTextareaValue) {
                  error("Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components");
                  didWarnDefaultTextareaValue = true;
                }
              }
              target.push(startChunkForTag("textarea"));
              var value = null;
              var defaultValue = null;
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
                    case "value":
                      value = propValue;
                      break;
                    case "defaultValue":
                      defaultValue = propValue;
                      break;
                    case "dangerouslySetInnerHTML":
                      throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
                    default:
                      pushAttribute(target, responseState, propKey, propValue);
                      break;
                  }
                }
              }
              if (value === null && defaultValue !== null) {
                value = defaultValue;
              }
              target.push(endOfStartTag);
              if (children != null) {
                {
                  error("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
                }
                if (value != null) {
                  throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
                }
                if (isArray(children)) {
                  if (children.length > 1) {
                    throw new Error("<textarea> can only have at most one child.");
                  }
                  {
                    checkHtmlStringCoercion(children[0]);
                  }
                  value = "" + children[0];
                }
                {
                  checkHtmlStringCoercion(children);
                }
                value = "" + children;
              }
              if (typeof value === "string" && value[0] === "\n") {
                target.push(leadingNewline);
              }
              if (value !== null) {
                {
                  checkAttributeStringCoercion(value, "value");
                }
                target.push(stringToChunk(encodeHTMLTextNode("" + value)));
              }
              return null;
            }