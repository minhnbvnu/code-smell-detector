function _findFirstWidgetColumn(model){
      var column = null;
      if (!angular.isArray(model.rows)){
        $log.error('model does not have any rows');
        return null;
      }
      for (var i=0; i<model.rows.length; i++){
        var row = model.rows[i];
        if (angular.isArray(row.columns)){
          for (var j=0; j<row.columns.length; j++){
            var col = row.columns[j];
            if (!col.rows){
              column = col;
              break;
            }
          }
        }
        if (column){
          break;
        }
      }
      return column;
    }