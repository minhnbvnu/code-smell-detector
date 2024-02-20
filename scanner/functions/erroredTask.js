function erroredTask(request, boundary, segment, error2) {
              var errorDigest = logRecoverableError(request, error2);
              if (boundary === null) {
                fatalError(request, error2);
              } else {
                boundary.pendingTasks--;
                if (!boundary.forceClientRender) {
                  boundary.forceClientRender = true;
                  boundary.errorDigest = errorDigest;
                  {
                    captureBoundaryErrorDetailsDev(boundary, error2);
                  }
                  if (boundary.parentFlushed) {
                    request.clientRenderedBoundaries.push(boundary);
                  }
                }
              }
              request.allPendingTasks--;
              if (request.allPendingTasks === 0) {
                var onAllReady = request.onAllReady;
                onAllReady();
              }
            }