function loadExpressions() {
    Expressions.query({ intent_id: $scope.$routeParams.intent_id }, function (data) {
      $scope.expressionList = data;
      loadExpressionParameters();
    });
  }