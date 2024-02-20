function checkRasaStatus() {
    Rasa_Status.get(function (statusdata) {
      $scope.config = JSON.parse(angular.toJson(statusdata));
    });
  }