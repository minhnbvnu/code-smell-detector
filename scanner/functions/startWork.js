function startWork(request) {
              scheduleWork(function() {
                return performWork(request);
              });
            }