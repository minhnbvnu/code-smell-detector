function setTopicMessages(allData, format, forPartition) {
    if(forPartition) {
        $scope.showAdvanced = true;
        $scope.disableAllPartitionButtons = true;
        if(allData.length === 0) $scope.partitionIsEmpty = true;
    }
     $scope.rows = allData;
     $scope.format=format;
     $scope.dataForDownload = $scope.rows

     if(format == 'binary'){
       angular.forEach($scope.rows, function(row){
          row.key=$base64.decode(row.key)
          row.value=$base64.decode(row.value)
       })
      $scope.dataForDownload = $scope.rows
     }
     $scope.showSpinner = false;

    if(allData.length > 0) {

     var floor = $scope.firstOffsetForPartition ? $scope.firstOffsetForPartition : allData[0].offset;
     }
  }