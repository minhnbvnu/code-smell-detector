function QPromise (executor) {
        let deferred = $q.defer()

        try {
          executor(
            angular.bind(deferred, deferred.resolve),
            angular.bind(deferred, deferred.reject)
          )
        } catch (err) {
          deferred.reject(err)
        }

        return deferred.promise
      }