function transitionFailure(deferred, tFail) {
            return function failureFn(error) {
              popStack();
              $rootScope.$broadcast("$transitionError", tFail, error);
              deferred.reject(error);  // $transition$ deferred
              return $q.reject(error);
            };
          }