function pushStartOption(target, props, responseState, formatContext) {
              var selectedValue = formatContext.selectedValue;
              target.push(startChunkForTag("option"));
              var children = null;
              var value = null;
              var selected = null;
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
                    case "selected":
                      selected = propValue;
                      {
                        if (!didWarnSelectedSetOnOption) {
                          error("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>.");
                          didWarnSelectedSetOnOption = true;
                        }
                      }
                      break;
                    case "dangerouslySetInnerHTML":
                      innerHTML = propValue;
                      break;
                    case "value":
                      value = propValue;
                    default:
                      pushAttribute(target, responseState, propKey, propValue);
                      break;
                  }
                }
              }
              if (selectedValue != null) {
                var stringValue;
                if (value !== null) {
                  {
                    checkAttributeStringCoercion(value, "value");
                  }
                  stringValue = "" + value;
                } else {
                  {
                    if (innerHTML !== null) {
                      if (!didWarnInvalidOptionInnerHTML) {
                        didWarnInvalidOptionInnerHTML = true;
                        error("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.");
                      }
                    }
                  }
                  stringValue = flattenOptionChildren(children);
                }
                if (isArray(selectedValue)) {
                  for (var i = 0; i < selectedValue.length; i++) {
                    {
                      checkAttributeStringCoercion(selectedValue[i], "value");
                    }
                    var v = "" + selectedValue[i];
                    if (v === stringValue) {
                      target.push(selectedMarkerAttribute);
                      break;
                    }
                  }
                } else {
                  {
                    checkAttributeStringCoercion(selectedValue, "select.value");
                  }
                  if ("" + selectedValue === stringValue) {
                    target.push(selectedMarkerAttribute);
                  }
                }
              } else if (selected) {
                target.push(selectedMarkerAttribute);
              }
              target.push(endOfStartTag);
              pushInnerHTML(target, innerHTML, children);
              return children;
            }