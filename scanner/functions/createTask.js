function createTask(request, node, blockedBoundary, blockedSegment, abortSet, legacyContext, context, treeContext) {
              request.allPendingTasks++;
              if (blockedBoundary === null) {
                request.pendingRootTasks++;
              } else {
                blockedBoundary.pendingTasks++;
              }
              var task = {
                node,
                ping: function() {
                  return pingTask(request, task);
                },
                blockedBoundary,
                blockedSegment,
                abortSet,
                legacyContext,
                context,
                treeContext
              };
              {
                task.componentStack = null;
              }
              abortSet.add(task);
              return task;
            }