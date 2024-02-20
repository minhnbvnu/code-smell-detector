function changeStructure(model, structure){
      var columns = _readColumns(model);
      var counter = 0;

      model.rows = angular.copy(structure.rows);

      while ( counter < columns.length ){
        counter = _fillStructure(model, columns, counter);
      }
    }