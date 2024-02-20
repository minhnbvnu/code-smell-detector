function release() {
    if (backdropHolds === 1) {
      el.removeClass('active');
      $rootScope.$broadcast('backdrop.hidden');
      $timeout(function() {
        // If we're still at 0 backdropHolds after async...
        if (backdropHolds === 0) el.removeClass('visible');
      }, 400, false);
    }
    backdropHolds = Math.max(0, backdropHolds - 1);
  }