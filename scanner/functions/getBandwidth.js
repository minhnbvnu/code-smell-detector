function getBandwidth() {
        // if mode is not on always return high
        if (loginData.enableLowBandwidth == false) {
          return "highbw";
        }
        // if mode is force on, return low
        if (loginData.enableLowBandwidth == true && loginData.autoSwitchBandwidth != true) {
          return "lowbw";
        }
        if (loginData.enableLowBandwidth == true && loginData.autoSwitchBandwidth == true && $rootScope.platformOS == 'desktop') {
          return "highbw";
        }
        // else return real state

        switch (navigator.connection.type) {
          case Connection.WIFI:
            return "highbw";
          case Connection.ETHERNET:
            return "highbw";
          default:
            return "lowbw";
        }
      }