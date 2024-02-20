function renderToStringImpl(children, options, generateStaticMarkup, abortReason) {
              var didFatal = false;
              var fatalError2 = null;
              var result = "";
              var destination = {
                push: function(chunk) {
                  if (chunk !== null) {
                    result += chunk;
                  }
                  return true;
                },
                destroy: function(error2) {
                  didFatal = true;
                  fatalError2 = error2;
                }
              };
              var readyToStream = false;
              function onShellReady() {
                readyToStream = true;
              }
              var request = createRequest(children, createResponseState$1(generateStaticMarkup, options ? options.identifierPrefix : void 0), createRootFormatContext(), Infinity, onError, void 0, onShellReady, void 0, void 0);
              startWork(request);
              abort(request, abortReason);
              startFlowing(request, destination);
              if (didFatal) {
                throw fatalError2;
              }
              if (!readyToStream) {
                throw new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
              }
              return result;
            }