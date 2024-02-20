function createHotTable(){
     hotRows = [];
     $scope.hotTableHeaders = [];

      $scope.hotTableHeaders.push('Offset', 'Partition')

      if ($scope.extraColsNumKeys > 0){
        angular.forEach($scope.cols3, function(colheader) {
          $scope.hotTableHeaders.push('key.'+colheader)
        })
      } else {
        $scope.hotTableHeaders.push('Key')
      }

      if ($scope.extraColsNumValues > 0){
        angular.forEach($scope.cols2, function(colheader) {
          $scope.hotTableHeaders.push('value.'+colheader)
        })
      } else {
          $scope.hotTableHeaders.push('Value')
      }

      angular.forEach($scope.flatRows, function (rows) {
        var hotCol = [];
        angular.forEach(rows, function (col, key) {
          if( key !== "$$hashKey" ) {
           hotCol.push(col)
          }
        })

        hotRows.push(hotCol)
      })
      $scope.refreshData();
    }