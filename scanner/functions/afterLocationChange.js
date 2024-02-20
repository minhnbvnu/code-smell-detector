function afterLocationChange(oldUrl, oldState) {
      $rootScope.$broadcast('$locationChangeSuccess', $location.absUrl(), oldUrl,
        $location.$$state, oldState);
    }