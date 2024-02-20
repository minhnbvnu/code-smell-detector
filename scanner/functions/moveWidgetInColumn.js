function moveWidgetInColumn($scope, column, evt){
      var widgets = column.widgets;
      // move widget and apply to scope
      $scope.$apply(function(){
        widgets.splice(evt.newIndex, 0, widgets.splice(evt.oldIndex, 1)[0]);
        $rootScope.$broadcast('adfWidgetMovedInColumn');
      });
    }