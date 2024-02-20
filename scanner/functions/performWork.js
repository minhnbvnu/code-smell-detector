function performWork(request) {
              if (request.status === CLOSED) {
                return;
              }
              var prevContext = getActiveContext();
              var prevDispatcher = ReactCurrentDispatcher$1.current;
              ReactCurrentDispatcher$1.current = Dispatcher;
              var prevGetCurrentStackImpl;
              {
                prevGetCurrentStackImpl = ReactDebugCurrentFrame$1.getCurrentStack;
                ReactDebugCurrentFrame$1.getCurrentStack = getCurrentStackInDEV;
              }
              var prevResponseState = currentResponseState;
              setCurrentResponseState(request.responseState);
              try {
                var pingedTasks = request.pingedTasks;
                var i;
                for (i = 0; i < pingedTasks.length; i++) {
                  var task = pingedTasks[i];
                  retryTask(request, task);
                }
                pingedTasks.splice(0, i);
                if (request.destination !== null) {
                  flushCompletedQueues(request, request.destination);
                }
              } catch (error2) {
                logRecoverableError(request, error2);
                fatalError(request, error2);
              } finally {
                setCurrentResponseState(prevResponseState);
                ReactCurrentDispatcher$1.current = prevDispatcher;
                {
                  ReactDebugCurrentFrame$1.getCurrentStack = prevGetCurrentStackImpl;
                }
                if (prevDispatcher === Dispatcher) {
                  switchContext(prevContext);
                }
              }
            }