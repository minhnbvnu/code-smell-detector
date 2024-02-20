function onShellError(error2) {
                  allReady.catch(function() {
                  });
                  reject(error2);
                }