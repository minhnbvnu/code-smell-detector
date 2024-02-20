function abortTask(task, request, reason) {
              var boundary = task.blockedBoundary;
              var segment = task.blockedSegment;
              segment.status = ABORTED;
              if (boundary === null) {
                request.allPendingTasks--;
                if (request.status !== CLOSED) {
                  request.status = CLOSED;
                  if (request.destination !== null) {
                    close(request.destination);
                  }
                }
              } else {
                boundary.pendingTasks--;
                if (!boundary.forceClientRender) {
                  boundary.forceClientRender = true;
                  var _error = reason === void 0 ? new Error("The render was aborted by the server without a reason.") : reason;
                  boundary.errorDigest = request.onError(_error);
                  {
                    var errorPrefix = "The server did not finish this Suspense boundary: ";
                    if (_error && typeof _error.message === "string") {
                      _error = errorPrefix + _error.message;
                    } else {
                      _error = errorPrefix + String(_error);
                    }
                    var previousTaskInDev = currentTaskInDEV;
                    currentTaskInDEV = task;
                    try {
                      captureBoundaryErrorDetailsDev(boundary, _error);
                    } finally {
                      currentTaskInDEV = previousTaskInDev;
                    }
                  }
                  if (boundary.parentFlushed) {
                    request.clientRenderedBoundaries.push(boundary);
                  }
                }
                boundary.fallbackAbortableTasks.forEach(function(fallbackTask) {
                  return abortTask(fallbackTask, request, reason);
                });
                boundary.fallbackAbortableTasks.clear();
                request.allPendingTasks--;
                if (request.allPendingTasks === 0) {
                  var onAllReady = request.onAllReady;
                  onAllReady();
                }
              }
            }