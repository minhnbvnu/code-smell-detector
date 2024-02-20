function _readColumns(root, columns) {
      columns = columns || [];

      if (angular.isDefined(root.rows)) {
        angular.forEach(root.rows, function (row) {
          angular.forEach(row.columns, function (col) {
            if (!col.hasOwnProperty('rows')) {
              columns.push(col);
            }
            // keep reading columns until we can't any more
            _readColumns(col, columns);
          });
        });
      }

      return columns;
    }