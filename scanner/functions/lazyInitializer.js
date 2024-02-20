function lazyInitializer(payload) {
              if (payload._status === Uninitialized) {
                var ctor = payload._result;
                var thenable = ctor();
                thenable.then(function(moduleObject2) {
                  if (payload._status === Pending || payload._status === Uninitialized) {
                    var resolved = payload;
                    resolved._status = Resolved;
                    resolved._result = moduleObject2;
                  }
                }, function(error2) {
                  if (payload._status === Pending || payload._status === Uninitialized) {
                    var rejected = payload;
                    rejected._status = Rejected;
                    rejected._result = error2;
                  }
                });
                if (payload._status === Uninitialized) {
                  var pending = payload;
                  pending._status = Pending;
                  pending._result = thenable;
                }
              }
              if (payload._status === Resolved) {
                var moduleObject = payload._result;
                {
                  if (moduleObject === void 0) {
                    error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?", moduleObject);
                  }
                }
                {
                  if (!("default" in moduleObject)) {
                    error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", moduleObject);
                  }
                }
                return moduleObject.default;
              } else {
                throw payload._result;
              }
            }