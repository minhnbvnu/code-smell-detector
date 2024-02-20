function loadExpressionParameters() {
    Parameters.query({ intent_id: $scope.$routeParams.intent_id }, function (
      data
    ) {
      $scope.parameterList = data;
      $scope.parameterFilterList = data;
      //Loop through each parameter and highlight the words it is for
      for (let z = 0; z <= $scope.expressionList.length; z++) {
        if ($scope.expressionList[z] !== undefined) {
          let text = $scope.expressionList[z].expression_text;
          for (let i = 0; i <= data.length - 1; i++) {
            if (
              $scope.expressionList[z].expression_id === data[i].expression_id
            ) {
              text = highlight(text, data[i].parameter_value);
            }
          }
          $scope.expressionList[z].expression_highlighted_text = text;
        }
      }
    });
  }