function futureState_otherwise($injector, $location) {
      var resyncing = false;

      var lazyLoadMissingState =
        ['$rootScope', '$urlRouter', '$state',
          function lazyLoadMissingState($rootScope, $urlRouter, $state) {
            function resync() {
              resyncing = true; $urlRouter.sync(); resyncing = false;
            }
            if (!initDone) {
              // Asynchronously load state definitions, then resync URL
              initPromise().then(resync);
              initDone = true;
              return;
            }

            var futureState = findFutureState($state, { url: $location.path() });
            if (!futureState) {
              return $injector.invoke(otherwiseFunc);
            }

            // Config loaded.  Asynchronously lazy-load state definition from URL fragment, if mapped.
            lazyLoadState($injector, futureState).then(function lazyLoadedStateCallback(states) {
              states.forEach(function (state) {
                if (state && (!$state.get(state) || (state.name && !$state.get(state.name))))
                  $stateProvider.state(state);
              });
              lazyloadInProgress = false;
              resync();
            }, function lazyLoadStateAborted() {
              lazyloadInProgress = false;
              resync();
            });
          }];
      if (lazyloadInProgress) return;

      var nextFn = resyncing ? otherwiseFunc : lazyLoadMissingState;
      return $injector.invoke(nextFn);
    }