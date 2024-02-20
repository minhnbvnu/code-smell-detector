function retryTask(request, task) {
              var segment = task.blockedSegment;
              if (segment.status !== PENDING) {
                return;
              }
              switchContext(task.context);
              var prevTaskInDEV = null;
              {
                prevTaskInDEV = currentTaskInDEV;
                currentTaskInDEV = task;
              }
              try {
                renderNodeDestructive(request, task, task.node);
                pushSegmentFinale(segment.chunks, request.responseState, segment.lastPushedText, segment.textEmbedded);
                task.abortSet.delete(task);
                segment.status = COMPLETED;
                finishedTask(request, task.blockedBoundary, segment);
              } catch (x) {
                resetHooksState();
                if (typeof x === "object" && x !== null && typeof x.then === "function") {
                  var ping = task.ping;
                  x.then(ping, ping);
                } else {
                  task.abortSet.delete(task);
                  segment.status = ERRORED;
                  erroredTask(request, task.blockedBoundary, segment, x);
                }
              } finally {
                {
                  currentTaskInDEV = prevTaskInDEV;
                }
              }
            }