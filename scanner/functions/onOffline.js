function onOffline() {
        $timeout(function () {
          $rootScope.online = false;
          NVR.log("************** Your network went offline");

          //$rootScope.$emit('network-change', "offline");

        });
      }