function abort(request, reason) {
              try {
                var abortableTasks = request.abortableTasks;
                abortableTasks.forEach(function(task) {
                  return abortTask(task, request, reason);
                });
                abortableTasks.clear();
                if (request.destination !== null) {
                  flushCompletedQueues(request, request.destination);
                }
              } catch (error2) {
                logRecoverableError(request, error2);
                fatalError(request, error2);
              }
            }