function checkSelectProp(props, propName) {
              {
                var value = props[propName];
                if (value != null) {
                  var array = isArray(value);
                  if (props.multiple && !array) {
                    error("The `%s` prop supplied to <select> must be an array if `multiple` is true.", propName);
                  } else if (!props.multiple && array) {
                    error("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.", propName);
                  }
                }
              }
            }