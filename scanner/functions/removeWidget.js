function removeWidget(){
      var element = compileTemplate(directive);
      element.find('.glyphicon-remove').click();
      $scope.$digest();
    }