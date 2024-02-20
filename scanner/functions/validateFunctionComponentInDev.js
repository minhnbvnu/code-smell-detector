function validateFunctionComponentInDev(Component) {
              {
                if (Component) {
                  if (Component.childContextTypes) {
                    error("%s(...): childContextTypes cannot be defined on a function component.", Component.displayName || Component.name || "Component");
                  }
                }
                if (typeof Component.getDerivedStateFromProps === "function") {
                  var _componentName3 = getComponentNameFromType(Component) || "Unknown";
                  if (!didWarnAboutGetDerivedStateOnFunctionComponent[_componentName3]) {
                    error("%s: Function components do not support getDerivedStateFromProps.", _componentName3);
                    didWarnAboutGetDerivedStateOnFunctionComponent[_componentName3] = true;
                  }
                }
                if (typeof Component.contextType === "object" && Component.contextType !== null) {
                  var _componentName4 = getComponentNameFromType(Component) || "Unknown";
                  if (!didWarnAboutContextTypeOnFunctionComponent[_componentName4]) {
                    error("%s: Function components do not support contextType.", _componentName4);
                    didWarnAboutContextTypeOnFunctionComponent[_componentName4] = true;
                  }
                }
              }
            }