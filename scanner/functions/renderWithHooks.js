function renderWithHooks(request, task, Component, props, secondArg) {
              var componentIdentity = {};
              prepareToUseHooks(task, componentIdentity);
              var result = Component(props, secondArg);
              return finishHooks(Component, props, result, secondArg);
            }