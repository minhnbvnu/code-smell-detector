function constructClassInstance(ctor, props, maskedLegacyContext) {
              var context = emptyContextObject;
              var contextType = ctor.contextType;
              {
                if ("contextType" in ctor) {
                  var isValid = (
                    // Allow null for conditional declaration
                    contextType === null || contextType !== void 0 && contextType.$$typeof === REACT_CONTEXT_TYPE && contextType._context === void 0
                  );
                  if (!isValid && !didWarnAboutInvalidateContextType.has(ctor)) {
                    didWarnAboutInvalidateContextType.add(ctor);
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
                    error("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", getComponentNameFromType(ctor) || "Component", addendum);
                  }
                }
              }
              if (typeof contextType === "object" && contextType !== null) {
                context = readContext(contextType);
              } else {
                context = maskedLegacyContext;
              }
              var instance = new ctor(props, context);
              {
                if (typeof ctor.getDerivedStateFromProps === "function" && (instance.state === null || instance.state === void 0)) {
                  var componentName = getComponentNameFromType(ctor) || "Component";
                  if (!didWarnAboutUninitializedState.has(componentName)) {
                    didWarnAboutUninitializedState.add(componentName);
                    error("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", componentName, instance.state === null ? "null" : "undefined", componentName);
                  }
                }
                if (typeof ctor.getDerivedStateFromProps === "function" || typeof instance.getSnapshotBeforeUpdate === "function") {
                  var foundWillMountName = null;
                  var foundWillReceivePropsName = null;
                  var foundWillUpdateName = null;
                  if (typeof instance.componentWillMount === "function" && instance.componentWillMount.__suppressDeprecationWarning !== true) {
                    foundWillMountName = "componentWillMount";
                  } else if (typeof instance.UNSAFE_componentWillMount === "function") {
                    foundWillMountName = "UNSAFE_componentWillMount";
                  }
                  if (typeof instance.componentWillReceiveProps === "function" && instance.componentWillReceiveProps.__suppressDeprecationWarning !== true) {
                    foundWillReceivePropsName = "componentWillReceiveProps";
                  } else if (typeof instance.UNSAFE_componentWillReceiveProps === "function") {
                    foundWillReceivePropsName = "UNSAFE_componentWillReceiveProps";
                  }
                  if (typeof instance.componentWillUpdate === "function" && instance.componentWillUpdate.__suppressDeprecationWarning !== true) {
                    foundWillUpdateName = "componentWillUpdate";
                  } else if (typeof instance.UNSAFE_componentWillUpdate === "function") {
                    foundWillUpdateName = "UNSAFE_componentWillUpdate";
                  }
                  if (foundWillMountName !== null || foundWillReceivePropsName !== null || foundWillUpdateName !== null) {
                    var _componentName = getComponentNameFromType(ctor) || "Component";
                    var newApiName = typeof ctor.getDerivedStateFromProps === "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
                    if (!didWarnAboutLegacyLifecyclesAndDerivedState.has(_componentName)) {
                      didWarnAboutLegacyLifecyclesAndDerivedState.add(_componentName);
                      error("Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n%s uses %s but also contains the following legacy lifecycles:%s%s%s\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://reactjs.org/link/unsafe-component-lifecycles", _componentName, newApiName, foundWillMountName !== null ? "\n  " + foundWillMountName : "", foundWillReceivePropsName !== null ? "\n  " + foundWillReceivePropsName : "", foundWillUpdateName !== null ? "\n  " + foundWillUpdateName : "");
                    }
                  }
                }
              }
              return instance;
            }