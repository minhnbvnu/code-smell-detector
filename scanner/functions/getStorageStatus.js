function getStorageStatus() {

    $scope.storage = [];
    NVR.debug("StorageStatus: " + apiStorage);
    $http.get(apiStorage)
      .then(
        function (success) {
        
          $scope.storage = success.data.storage;
          //console.log (JSON.stringify($scope.storage));

        },
        function (error) {
          $scope.zmDisk = "unknown";
          // console.log("ERROR:" + JSON.stringify(error));
          NVR.log("Error retrieving DiskStatus: " + JSON.stringify(error), "error");
        }
      );
  }