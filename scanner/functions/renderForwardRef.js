function renderForwardRef(request, task, type, props, ref) {
              pushFunctionComponentStackInDEV(task, type.render);
              var children = renderWithHooks(request, task, type.render, props, ref);
              var hasId = checkDidRenderIdHook();
              if (hasId) {
                var prevTreeContext = task.treeContext;
                var totalChildren = 1;
                var index = 0;
                task.treeContext = pushTreeContext(prevTreeContext, totalChildren, index);
                try {
                  renderNodeDestructive(request, task, children);
                } finally {
                  task.treeContext = prevTreeContext;
                }
              } else {
                renderNodeDestructive(request, task, children);
              }
              popComponentStackInDEV(task);
            }