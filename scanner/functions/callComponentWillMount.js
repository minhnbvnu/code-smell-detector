function callComponentWillMount(type, instance) {
              var oldState = instance.state;
              if (typeof instance.componentWillMount === "function") {
                {
                  if (instance.componentWillMount.__suppressDeprecationWarning !== true) {
                    var componentName = getComponentNameFromType(type) || "Unknown";
                    if (!didWarnAboutDeprecatedWillMount[componentName]) {
                      warn(
                        // keep this warning in sync with ReactStrictModeWarning.js
                        "componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n* Move code from componentWillMount to componentDidMount (preferred in most cases) or the constructor.\n\nPlease update the following components: %s",
                        componentName
                      );
                      didWarnAboutDeprecatedWillMount[componentName] = true;
                    }
                  }
                }
                instance.componentWillMount();
              }
              if (typeof instance.UNSAFE_componentWillMount === "function") {
                instance.UNSAFE_componentWillMount();
              }
              if (oldState !== instance.state) {
                {
                  error("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", getComponentNameFromType(type) || "Component");
                }
                classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
              }
            }