function clearTimer() {
      if (angular.isDefined(mediaTimer)) {
          $interval.cancel(mediaTimer);
          mediaTimer = undefined;
      }
  }