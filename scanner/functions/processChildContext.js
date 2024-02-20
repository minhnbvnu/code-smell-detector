function processChildContext(instance, type, parentContext, childContextTypes) {
              {
                if (typeof instance.getChildContext !== "function") {
                  {
                    var componentName = getComponentNameFromType(type) || "Unknown";
                    if (!warnedAboutMissingGetChildContext[componentName]) {
                      warnedAboutMissingGetChildContext[componentName] = true;
                      error("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", componentName, componentName);
                    }
                  }
                  return parentContext;
                }
                var childContext = instance.getChildContext();
                for (var contextKey in childContext) {
                  if (!(contextKey in childContextTypes)) {
                    throw new Error((getComponentNameFromType(type) || "Unknown") + '.getChildContext(): key "' + contextKey + '" is not defined in childContextTypes.');
                  }
                }
                {
                  var name = getComponentNameFromType(type) || "Unknown";
                  checkPropTypes(childContextTypes, childContext, "child context", name);
                }
                return assign({}, parentContext, childContext);
              }
            }