function renderToReadableStream(children, options) {
              return new Promise(function(resolve, reject) {
                var onFatalError;
                var onAllReady;
                var allReady = new Promise(function(res, rej) {
                  onAllReady = res;
                  onFatalError = rej;
                });
                function onShellReady() {
                  var stream = new ReadableStream(
                    {
                      type: "bytes",
                      pull: function(controller) {
                        startFlowing(request, controller);
                      },
                      cancel: function(reason) {
                        abort(request);
                      }
                    },
                    // $FlowFixMe size() methods are not allowed on byte streams.
                    {
                      highWaterMark: 0
                    }
                  );
                  stream.allReady = allReady;
                  resolve(stream);
                }
                function onShellError(error2) {
                  allReady.catch(function() {
                  });
                  reject(error2);
                }
                var request = createRequest(children, createResponseState(options ? options.identifierPrefix : void 0, options ? options.nonce : void 0, options ? options.bootstrapScriptContent : void 0, options ? options.bootstrapScripts : void 0, options ? options.bootstrapModules : void 0), createRootFormatContext(options ? options.namespaceURI : void 0), options ? options.progressiveChunkSize : void 0, options ? options.onError : void 0, onAllReady, onShellReady, onShellError, onFatalError);
                if (options && options.signal) {
                  var signal = options.signal;
                  var listener = function() {
                    abort(request, signal.reason);
                    signal.removeEventListener("abort", listener);
                  };
                  signal.addEventListener("abort", listener);
                }
                startWork(request);
              });
            }