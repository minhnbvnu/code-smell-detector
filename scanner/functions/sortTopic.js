function sortTopic(type) {
      var reverse = 1;
      if (type.indexOf('-') == 0) {
        // remove the - symbol
        type = type.substring(1, type.length);
        reverse = -1;
      }
       $log.info(type + " " + reverse);
      $scope.flatRows = FlatTableFactory.sortByKey($scope.flatRows, type, reverse);
  }