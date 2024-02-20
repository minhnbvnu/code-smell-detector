function mountClassInstance(instance, ctor, newProps, maskedLegacyContext) {
              {
                checkClassInstance(instance, ctor, newProps);
              }
              var initialState = instance.state !== void 0 ? instance.state : null;
              instance.updater = classComponentUpdater;
              instance.props = newProps;
              instance.state = initialState;
              var internalInstance = {
                queue: [],
                replace: false
              };
              set(instance, internalInstance);
              var contextType = ctor.contextType;
              if (typeof contextType === "object" && contextType !== null) {
                instance.context = readContext(contextType);
              } else {
                instance.context = maskedLegacyContext;
              }
              {
                if (instance.state === newProps) {
                  var componentName = getComponentNameFromType(ctor) || "Component";
                  if (!didWarnAboutDirectlyAssigningPropsToState.has(componentName)) {
                    didWarnAboutDirectlyAssigningPropsToState.add(componentName);
                    error("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", componentName);
                  }
                }
              }
              var getDerivedStateFromProps = ctor.getDerivedStateFromProps;
              if (typeof getDerivedStateFromProps === "function") {
                instance.state = applyDerivedStateFromProps(instance, ctor, getDerivedStateFromProps, initialState, newProps);
              }
              if (typeof ctor.getDerivedStateFromProps !== "function" && typeof instance.getSnapshotBeforeUpdate !== "function" && (typeof instance.UNSAFE_componentWillMount === "function" || typeof instance.componentWillMount === "function")) {
                callComponentWillMount(ctor, instance);
                processUpdateQueue(internalInstance, instance, newProps, maskedLegacyContext);
              }
            }