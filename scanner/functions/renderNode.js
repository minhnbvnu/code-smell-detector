function renderNode(request, task, node) {
              var previousFormatContext = task.blockedSegment.formatContext;
              var previousLegacyContext = task.legacyContext;
              var previousContext = task.context;
              var previousComponentStack = null;
              {
                previousComponentStack = task.componentStack;
              }
              try {
                return renderNodeDestructive(request, task, node);
              } catch (x) {
                resetHooksState();
                if (typeof x === "object" && x !== null && typeof x.then === "function") {
                  spawnNewSuspendedTask(request, task, x);
                  task.blockedSegment.formatContext = previousFormatContext;
                  task.legacyContext = previousLegacyContext;
                  task.context = previousContext;
                  switchContext(previousContext);
                  {
                    task.componentStack = previousComponentStack;
                  }
                  return;
                } else {
                  task.blockedSegment.formatContext = previousFormatContext;
                  task.legacyContext = previousLegacyContext;
                  task.context = previousContext;
                  switchContext(previousContext);
                  {
                    task.componentStack = previousComponentStack;
                  }
                  throw x;
                }
              }
            }