function getMaskedContext(type, unmaskedContext) {
              {
                var contextTypes = type.contextTypes;
                if (!contextTypes) {
                  return emptyContextObject;
                }
                var context = {};
                for (var key in contextTypes) {
                  context[key] = unmaskedContext[key];
                }
                {
                  var name = getComponentNameFromType(type) || "Unknown";
                  checkPropTypes(contextTypes, context, "context", name);
                }
                return context;
              }
            }