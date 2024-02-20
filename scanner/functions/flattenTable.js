function flattenTable(rows) {

         var extraColumnsNumberValue = 0;
         var extraColumnsNumberKey = 0;
         var rowWithMoreColumns;
         $scope.flatRows = [];
         if (rows.length > 0) {
             angular.forEach(rows, function ( row, key) {
             row= {
               'offset' : row.offset,
               'partition': row.partition,
               'key' : row.key,
               'value' : row.value
             }
                   if (row.key == undefined || row.key == null) row.key = '';
                   if (row.value == undefined || row.value == null) row.value = '';

                   if((angular.isNumber(row.value) || angular.isString(row.value)) && (angular.isNumber(row.key) || angular.isString(row.key))) {
                         extraColumnsNumberValue = 0
                         extraColumnsNumberKey = 0
                         var newRow = {
                             "offset" : row.offset,
                             "partition" : row.partition,
                             "key" : row.key,
                             "value" : row.value
                         }
                         $scope.cols = Object.keys(FlatTableFactory.flattenObject(newRow));
                         $scope.cols2 = [];
                         $scope.cols3 = [];
                   } else {
                         var flatValue = FlatTableFactory.flattenObject(row.value);
                         var flatKey = FlatTableFactory.flattenObject(row.key);
                         var rowExtraColumnsValues = (!(angular.isNumber(row.value) || angular.isString(row.value))) ? Object.keys(flatValue).length : 0;
                         var rowExtraColumnsKeys = (!(angular.isNumber(row.key) || angular.isString(row.key))) ? Object.keys(flatKey).length : 0;

                         if(extraColumnsNumberValue < rowExtraColumnsValues) {
                             extraColumnsNumberValue = rowExtraColumnsValues;
                             rowWithMoreColumns = row;
                         }

                         if(extraColumnsNumberKey < rowExtraColumnsKeys) {
                             extraColumnsNumberKey = rowExtraColumnsKeys;
                             rowWithMoreColumns = row;
                         }

                         var newRow = {
                             "offset" : rowWithMoreColumns.offset,
                             "partition" : rowWithMoreColumns.partition,
                             "key" : rowWithMoreColumns.key,
                             "value" : rowWithMoreColumns.value
                         }

                         $scope.cols =  Object.keys(FlatTableFactory.flattenObject(newRow));
                         if (!(angular.isNumber(row.value) || angular.isString(row.value))){
                           $scope.cols2 = Object.keys(FlatTableFactory.flattenObject(newRow.value));
                         }
                         else {
                           $scope.cols2 = []
                         }
                         if (!(angular.isNumber(row.key) || angular.isString(row.key))){
                           $scope.cols3 = Object.keys(FlatTableFactory.flattenObject(newRow.key));
                         }
                         else {
                           $scope.cols3 = [];
                         }

                   }
                   $scope.flatRows.push(FlatTableFactory.flattenObject(row));

                   if (key == rows.length -1) {
                       setTimeout(function () {
                               $scope.$apply(function () {
                                  createHotTable()
                               });
                     }, 500)
                   }
                 });

                 $scope.extraColsNumValues = extraColumnsNumberValue;
                 $scope.extraColsNumKeys = extraColumnsNumberKey;


          var itemsPerPage = (window.innerHeight - 300) / 31
          Math.floor(itemsPerPage) < 10 ? $scope.fittingItems =10 : $scope.fittingItems = Math.floor(itemsPerPage);

        $scope.paginationItems = $scope.fittingItems;
        $scope.showHideAllButtonLabel = 'show ' + rows.length;

      }
 }