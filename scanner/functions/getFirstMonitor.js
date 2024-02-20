function getFirstMonitor() {
    var d = $q.defer();
    $http.get($scope.wizard.apiURL + "/monitors.json?"+$rootScope.authSession)
      .then(function (success) {
          // console.log("getfirst monitor success: " + JSON.stringify(success));
          if (success.data.monitors.length > 0) {
            var foundMid = -1;
            for (var i = 0; i < success.data.monitors.length; i++) {
              if (success.data.monitors[i].Monitor.Function != 'None') {
                foundMid = success.data.monitors[i].Monitor.Id;
                break;
              }
            }

            if (foundMid != -1) {
              NVR.debug("zmWizard - getFirstMonitor returned " + foundMid);
              d.resolve(foundMid);
              return d.promise;
            } else {
              d.reject(false);
              return d.promise;
            }

          } else {
            d.reject(false);
            return d.promise;
          }
        },
        function (error) {
          //console.log("getfirst monitor error: " + JSON.stringify(error));
          d.reject(false);
          return d.promise;
        });
    return d.promise;
  }