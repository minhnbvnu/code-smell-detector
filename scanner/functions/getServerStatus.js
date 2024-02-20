function getServerStatus() {

    $scope.servers = [];
    NVR.debug("ServerStatus: " + apiStorage);
    $http.get(apiServer)
      .then(
        function (success) {
        
          $scope.servers = success.data.servers;
          if ($scope.servers.length > 0) {
            $scope.zmRun =$translate.instant('kStateMultiServer');
            $scope.color = 'grey';
          }
         // console.log (JSON.stringify($scope.storage));

        },
        function (error) {
          $scope.zmDisk = "unknown";
          // console.log("ERROR:" + JSON.stringify(error));
          NVR.log("Error retrieving DiskStatus: " + JSON.stringify(error), "error");
        }
      );
  }