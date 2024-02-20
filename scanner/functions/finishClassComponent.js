function finishClassComponent(request, task, instance, Component, props) {
              var nextChildren = instance.render();
              {
                if (instance.props !== props) {
                  if (!didWarnAboutReassigningProps) {
                    error("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", getComponentNameFromType(Component) || "a component");
                  }
                  didWarnAboutReassigningProps = true;
                }
              }
              {
                var childContextTypes = Component.childContextTypes;
                if (childContextTypes !== null && childContextTypes !== void 0) {
                  var previousContext = task.legacyContext;
                  var mergedContext = processChildContext(instance, Component, previousContext, childContextTypes);
                  task.legacyContext = mergedContext;
                  renderNodeDestructive(request, task, nextChildren);
                  task.legacyContext = previousContext;
                  return;
                }
              }
              renderNodeDestructive(request, task, nextChildren);
            }