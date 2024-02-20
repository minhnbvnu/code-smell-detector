function pushStartSelect(target, props, responseState) {
              {
                checkControlledValueProps("select", props);
                checkSelectProp(props, "value");
                checkSelectProp(props, "defaultValue");
                if (props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultSelectValue) {
                  error("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components");
                  didWarnDefaultSelectValue = true;
                }
              }
              target.push(startChunkForTag("select"));
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
                    case "defaultValue":
                    case "value":
                      break;
                    default:
                      pushAttribute(target, responseState, propKey, propValue);
                      break;
                  }
                }
              }
              target.push(endOfStartTag);
              pushInnerHTML(target, innerHTML, children);
              return children;
            }