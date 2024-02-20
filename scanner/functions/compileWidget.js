function compileWidget($scope, $element, currentScope) {
      var model = $scope.model;
      var content = $scope.content;

      var newScope = currentScope;
      if (!model){
        renderError($element, 'model is undefined')
      } else if (!content){
        var msg = 'widget content is undefined, please have a look at your browser log';
        renderError($element, msg);
      } else {
        newScope = renderWidget($scope, $element, currentScope, model, content);
      }
      return newScope;
    }