function getLoadStatus() {
    NVR.debug("StateCtrl/getLoadStatus: " + apiLoad);
    $http.get(apiLoad)
      .then(
        function (success) {
          NVR.debug("Load results: " + JSON.stringify(success));
          //console.log(JSON.stringify(success));
          // load returns 3 params - one in the middle is avg.
          NVR.debug("StateCtrl/getLoadStatus: success");
          $scope.zmLoad = success.data.load[1];

          // console.log("X"+success.data.result+"X");
        },
        function (error) {
          //console.log("ERROR in getLoad: " + JSON.stringify(error));
          NVR.log("Error retrieving loadStatus " + JSON.stringify(error), "error");
          $scope.zmLoad = 'undetermined';
        }
      );
  }