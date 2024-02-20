function pingTask(request, task) {
              var pingedTasks = request.pingedTasks;
              pingedTasks.push(task);
              if (pingedTasks.length === 1) {
                scheduleWork(function() {
                  return performWork(request);
                });
              }
            }