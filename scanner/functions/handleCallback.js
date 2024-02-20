function handleCallback(value, isResolved) {
            var callbackOutput = null;            
            try {
              callbackOutput = (callback ||defaultCallback)();
            } catch(e) {
              return makePromise(e, false);
            }            
            if (callbackOutput && callbackOutput.then) {
              return callbackOutput.then(function() {
                return makePromise(value, isResolved);
              }, function(error) {
                return makePromise(error, false);
              });
            } else {
              return makePromise(value, isResolved);
            }
          }