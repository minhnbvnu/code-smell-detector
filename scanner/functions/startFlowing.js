function startFlowing(request, destination) {
              if (request.status === CLOSING) {
                request.status = CLOSED;
                closeWithError(destination, request.fatalError);
                return;
              }
              if (request.status === CLOSED) {
                return;
              }
              if (request.destination !== null) {
                return;
              }
              request.destination = destination;
              try {
                flushCompletedQueues(request, destination);
              } catch (error2) {
                logRecoverableError(request, error2);
                fatalError(request, error2);
              }
            }