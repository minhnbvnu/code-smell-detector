function renderClassComponent(request, task, Component, props) {
              pushClassComponentStackInDEV(task, Component);
              var maskedContext = getMaskedContext(Component, task.legacyContext);
              var instance = constructClassInstance(Component, props, maskedContext);
              mountClassInstance(instance, Component, props, maskedContext);
              finishClassComponent(request, task, instance, Component, props);
              popComponentStackInDEV(task);
            }