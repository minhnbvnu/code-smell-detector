function getSimpleStates() {
    var newStates = {};
    newStates['main'] = {};
    newStates['A'] = { template: '<div ui-view="_1"></div><div ui-view="_2"></div><div ui-view="_3"></div>'};
    newStates['A._1'] = {sticky: true, views: { '_1@A': {} } };
    newStates['A._2'] = {sticky: true, views: { '_2@A': {} } };
    newStates['A._2.__1'] = { };
    newStates['A._3'] = {
      sticky: true,
      views: { '_3@A': { controller: function ($scope, X) {
        controllerInvokeCount++; Xvalue = X; } } },
      resolve: { X: function () { return $q.when(++resolveCount); }}
    };

    return newStates;
  }