function processContext(type, context, threadID, isClass) {
            if (isClass) {
              var contextType = type.contextType;
              {
                if ("contextType" in type) {
                  var isValid = contextType === null || contextType !== void 0 && contextType.$$typeof === REACT_CONTEXT_TYPE && contextType._context === void 0;
                  if (!isValid && !didWarnAboutInvalidateContextType.has(type)) {
                    didWarnAboutInvalidateContextType.add(type);
                    var addendum = "";
                    if (contextType === void 0) {
                      addendum = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file.";
                    } else if (typeof contextType !== "object") {
                      addendum = " However, it is set to a " + typeof contextType + ".";
                    } else if (contextType.$$typeof === REACT_PROVIDER_TYPE) {
                      addendum = " Did you accidentally pass the Context.Provider instead?";
                    } else if (contextType._context !== void 0) {
                      addendum = " Did you accidentally pass the Context.Consumer instead?";
                    } else {
                      addendum = " However, it is set to an object with keys {" + Object.keys(contextType).join(", ") + "}.";
                    }
                    error("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", getComponentName(type) || "Component", addendum);
                  }
                }
              }
              if (typeof contextType === "object" && contextType !== null) {
                validateContextBounds(contextType, threadID);
                return contextType[threadID];
              }
              {
                var maskedContext = maskContext(type, context);
                {
                  if (type.contextTypes) {
                    checkContextTypes(type.contextTypes, maskedContext, "context");
                  }
                }
                return maskedContext;
              }
            } else {
              {
                var _maskedContext = maskContext(type, context);
                {
                  if (type.contextTypes) {
                    checkContextTypes(type.contextTypes, _maskedContext, "context");
                  }
                }
                return _maskedContext;
              }
            }
          }