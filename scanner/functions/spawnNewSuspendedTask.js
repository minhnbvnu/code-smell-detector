function spawnNewSuspendedTask(request, task, x) {
              var segment = task.blockedSegment;
              var insertionIndex = segment.chunks.length;
              var newSegment = createPendingSegment(
                request,
                insertionIndex,
                null,
                segment.formatContext,
                // Adopt the parent segment's leading text embed
                segment.lastPushedText,
                // Assume we are text embedded at the trailing edge
                true
              );
              segment.children.push(newSegment);
              segment.lastPushedText = false;
              var newTask = createTask(request, task.node, task.blockedBoundary, newSegment, task.abortSet, task.legacyContext, task.context, task.treeContext);
              {
                if (task.componentStack !== null) {
                  newTask.componentStack = task.componentStack.parent;
                }
              }
              var ping = newTask.ping;
              x.then(ping, ping);
            }