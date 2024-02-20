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