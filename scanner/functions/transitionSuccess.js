function transitionSuccess(deferred, tSuccess) {
            return function successFn(data) {
              popStack();
              $rootScope.$broadcast("$transitionSuccess", tSuccess);
              deferred.resolve(data); // $transition$ deferred
              return data;
            };
          }