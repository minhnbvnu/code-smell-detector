function finishedTask(request, boundary, segment) {
              if (boundary === null) {
                if (segment.parentFlushed) {
                  if (request.completedRootSegment !== null) {
                    throw new Error("There can only be one root segment. This is a bug in React.");
                  }
                  request.completedRootSegment = segment;
                }
                request.pendingRootTasks--;
                if (request.pendingRootTasks === 0) {
                  request.onShellError = noop$1;
                  var onShellReady = request.onShellReady;
                  onShellReady();
                }
              } else {
                boundary.pendingTasks--;
                if (boundary.forceClientRender)
                  ;
                else if (boundary.pendingTasks === 0) {
                  if (segment.parentFlushed) {
                    if (segment.status === COMPLETED) {
                      queueCompletedSegment(boundary, segment);
                    }
                  }
                  if (boundary.parentFlushed) {
                    request.completedBoundaries.push(boundary);
                  }
                  boundary.fallbackAbortableTasks.forEach(abortTaskSoft, request);
                  boundary.fallbackAbortableTasks.clear();
                } else {
                  if (segment.parentFlushed) {
                    if (segment.status === COMPLETED) {
                      queueCompletedSegment(boundary, segment);
                      var completedSegments = boundary.completedSegments;
                      if (completedSegments.length === 1) {
                        if (boundary.parentFlushed) {
                          request.partialBoundaries.push(boundary);
                        }
                      }
                    }
                  }
                }
              }
              request.allPendingTasks--;
              if (request.allPendingTasks === 0) {
                var onAllReady = request.onAllReady;
                onAllReady();
              }
            }