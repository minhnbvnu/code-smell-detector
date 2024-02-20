function getZones() {
    //https://server/zm/api/zones/forMonitor/7.json
    var api = NVR.getLogin().apiurl + "/zones/forMonitor/" + $scope.monitorId + ".json?"+$rootScope.authSession;
    NVR.debug("Getting zones using:" + api);
    originalZones = [];
    $http.get(api)
      .then(function (succ) {
          // console.log (JSON.stringify(succ));
          for (var i = 0; i < succ.data.zones.length; i++) {
            originalZones.push({
              coords: succ.data.zones[i].Zone.Coords,
              area: succ.data.zones[i].Zone.Area,
              type: succ.data.zones[i].Zone.Type
            });
          }

        },
        function (err) {
          NVR.debug("Error getting zones :" + JSON.stringify(err));

        });

  }