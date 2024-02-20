function flattenOptionChildren(children) {
              var content = "";
              React3.Children.forEach(children, function(child) {
                if (child == null) {
                  return;
                }
                content += child;
                {
                  if (!didWarnInvalidOptionChildren && typeof child !== "string" && typeof child !== "number") {
                    didWarnInvalidOptionChildren = true;
                    error("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.");
                  }
                }
              });
              return content;
            }