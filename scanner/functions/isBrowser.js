function isBrowser() {
      return (!$window.cordova && !$window.PhoneGap && !$window.phonegap) || isRipple();
    }