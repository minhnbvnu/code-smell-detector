function renderContextProvider(request, task, type, props) {
              var context = type._context;
              var value = props.value;
              var children = props.children;
              var prevSnapshot;
              {
                prevSnapshot = task.context;
              }
              task.context = pushProvider(context, value);
              renderNodeDestructive(request, task, children);
              task.context = popProvider(context);
              {
                if (prevSnapshot !== task.context) {
                  error("Popping the context provider did not return back to the original snapshot. This is a bug in React.");
                }
              }
            }