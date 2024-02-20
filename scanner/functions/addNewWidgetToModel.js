function addNewWidgetToModel(model, widget, name){
      if (model){
        var column = _findFirstWidgetColumn(model);
        if (column){
          if (!column.widgets){
            column.widgets = [];
          }
          column.widgets.unshift(widget);

          $rootScope.$broadcast('adfWidgetAdded', name, model, widget);
        } else {
          $log.error('could not find first widget column');
        }
      } else {
        $log.error('model is undefined');
      }
    }