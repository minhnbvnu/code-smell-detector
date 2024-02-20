function getRasaStatus() {
    Rasa_Status.get(function(data) {
      if (data.model_file != undefined) {
        $scope.model_file = data.model_file;
      } else {
        $scope.model_file = "No model Loaded";
        $scope.trained_at = "Unavailable";
      }
      if (data.fingerprint != undefined) {
        $scope.trained_at = $scope.timeConverter(data.fingerprint.trained_at);
      } else {
        $scope.model_file = "No model loaded";
        $scope.trained_at = "Unavailable";
      }
    });
  }