function flushCompletedQueues(request, destination) {
              beginWriting();
              try {
                var completedRootSegment = request.completedRootSegment;
                if (completedRootSegment !== null && request.pendingRootTasks === 0) {
                  flushSegment(request, destination, completedRootSegment);
                  request.completedRootSegment = null;
                  writeCompletedRoot(destination, request.responseState);
                }
                var clientRenderedBoundaries = request.clientRenderedBoundaries;
                var i;
                for (i = 0; i < clientRenderedBoundaries.length; i++) {
                  var boundary = clientRenderedBoundaries[i];
                  if (!flushClientRenderedBoundary(request, destination, boundary)) {
                    request.destination = null;
                    i++;
                    clientRenderedBoundaries.splice(0, i);
                    return;
                  }
                }
                clientRenderedBoundaries.splice(0, i);
                var completedBoundaries = request.completedBoundaries;
                for (i = 0; i < completedBoundaries.length; i++) {
                  var _boundary = completedBoundaries[i];
                  if (!flushCompletedBoundary(request, destination, _boundary)) {
                    request.destination = null;
                    i++;
                    completedBoundaries.splice(0, i);
                    return;
                  }
                }
                completedBoundaries.splice(0, i);
                completeWriting(destination);
                beginWriting(destination);
                var partialBoundaries = request.partialBoundaries;
                for (i = 0; i < partialBoundaries.length; i++) {
                  var _boundary2 = partialBoundaries[i];
                  if (!flushPartialBoundary(request, destination, _boundary2)) {
                    request.destination = null;
                    i++;
                    partialBoundaries.splice(0, i);
                    return;
                  }
                }
                partialBoundaries.splice(0, i);
                var largeBoundaries = request.completedBoundaries;
                for (i = 0; i < largeBoundaries.length; i++) {
                  var _boundary3 = largeBoundaries[i];
                  if (!flushCompletedBoundary(request, destination, _boundary3)) {
                    request.destination = null;
                    i++;
                    largeBoundaries.splice(0, i);
                    return;
                  }
                }
                largeBoundaries.splice(0, i);
              } finally {
                completeWriting(destination);
                if (request.allPendingTasks === 0 && request.pingedTasks.length === 0 && request.clientRenderedBoundaries.length === 0 && request.completedBoundaries.length === 0) {
                  {
                    if (request.abortableTasks.size !== 0) {
                      error("There was still abortable task at the root when we closed. This is a bug in React.");
                    }
                  }
                  close(destination);
                }
              }
            }