function retain() {
    backdropHolds++;
    if (backdropHolds === 1) {
      el.addClass('visible');
      $rootScope.$broadcast('backdrop.shown');
      $$rAF(function() {
        // If we're still at >0 backdropHolds after async...
        if (backdropHolds >= 1) el.addClass('active');
      });
    }
  }