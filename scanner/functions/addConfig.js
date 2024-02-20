function addConfig(configObj, platformObj) {
    for (var n in configObj) {
      if (n != PLATFORM && configObj.hasOwnProperty(n)) {
        if (angular.isObject(configObj[n])) {
          if (!isDefined(platformObj[n])) {
            platformObj[n] = {};
          }
          addConfig(configObj[n], platformObj[n]);

        } else if (!isDefined(platformObj[n])) {
          platformObj[n] = null;
        }
      }
    }
  }