function lazyLoadState($injector, futureState) {
      lazyloadInProgress = true;
      var $q = $injector.get("$q");
      if (!futureState) {
        var deferred = $q.defer();
        deferred.reject("No lazyState passed in " + futureState);
        return deferred.promise;
      }

      var parentPromises = $q.when([]), parentFuture = futureState.parentFutureState;
      if (parentFuture && futureStates[parentFuture.name]) {
        parentPromises = lazyLoadState($injector, futureStates[parentFuture.name]);
      }

      var type = futureState.type;
      var factory = stateFactories[type];
      if (!factory) throw Error("No state factory for futureState.type: " + (futureState && futureState.type));

      var failedLoadPolicy = factory.$options && factory.$options.failedLazyLoadPolicy || "remove";
      function deregisterFutureState() { delete(futureStates[futureState.name]); }
      function errorHandler(err) {
        if (failedLoadPolicy === "remove") deregisterFutureState();
        return $q.reject(err);
      }

      return parentPromises.then(function(array) {
        var factoryPromise = $injector.invoke(factory, factory, { futureState: futureState });

        return factoryPromise.then(function(fullState) {
          deregisterFutureState(); // Success; remove future state
          if (fullState) { array.push(fullState); } // Pass a chain of realized states back
          return array;
        });
      }).catch(errorHandler)
    }