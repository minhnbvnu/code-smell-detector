function pushInput(target, props, responseState) {
              {
                checkControlledValueProps("input", props);
                if (props.checked !== void 0 && props.defaultChecked !== void 0 && !didWarnDefaultChecked) {
                  error("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", "A component", props.type);
                  didWarnDefaultChecked = true;
                }
                if (props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultInputValue) {
                  error("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", "A component", props.type);
                  didWarnDefaultInputValue = true;
                }
              }
              target.push(startChunkForTag("input"));
              var value = null;
              var defaultValue = null;
              var checked = null;
              var defaultChecked = null;
              for (var propKey in props) {
                if (hasOwnProperty.call(props, propKey)) {
                  var propValue = props[propKey];
                  if (propValue == null) {
                    continue;
                  }
                  switch (propKey) {
                    case "children":
                    case "dangerouslySetInnerHTML":
                      throw new Error("input is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
                    case "defaultChecked":
                      defaultChecked = propValue;
                      break;
                    case "defaultValue":
                      defaultValue = propValue;
                      break;
                    case "checked":
                      checked = propValue;
                      break;
                    case "value":
                      value = propValue;
                      break;
                    default:
                      pushAttribute(target, responseState, propKey, propValue);
                      break;
                  }
                }
              }
              if (checked !== null) {
                pushAttribute(target, responseState, "checked", checked);
              } else if (defaultChecked !== null) {
                pushAttribute(target, responseState, "checked", defaultChecked);
              }
              if (value !== null) {
                pushAttribute(target, responseState, "value", value);
              } else if (defaultValue !== null) {
                pushAttribute(target, responseState, "value", defaultValue);
              }
              target.push(endOfStartTagSelfClosing);
              return null;
            }