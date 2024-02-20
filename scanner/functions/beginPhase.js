function beginPhase(phase) {
      if ($rootScope.$$phase) {
        throw $rootScopeMinErr('inprog', '{0} already in progress', $rootScope.$$phase);
      }

      $rootScope.$$phase = phase;
    }