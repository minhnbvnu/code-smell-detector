function fatalError(request, error2) {
              var onShellError = request.onShellError;
              onShellError(error2);
              var onFatalError = request.onFatalError;
              onFatalError(error2);
              if (request.destination !== null) {
                request.status = CLOSED;
                closeWithError(request.destination, error2);
              } else {
                request.status = CLOSING;
                request.fatalError = error2;
              }
            }