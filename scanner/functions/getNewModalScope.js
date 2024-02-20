function getNewModalScope() {
       var scope = $scope.$new();
       //pass translate function to the new scope so we can translate the labels inside the modal dialog
       scope.translate = dashboard.translate;
       return scope;
      }