function ViewFactory(V) {
  var A = {
    a1: {
      key: 'a1',
      views: [{
        key: 'v1',
        name: 'div',
        props: [{
          key: 'class',
          value: "options-container"
        }]
      }, {
        key: 'v2',
        name: 'ul'
      }, {
        key: 'v3',
        name: 'li'
      }, {
        key: 'v4',
        name: 'Checkbox',
        props: [{
          key: 'checked',
          expr: function expr($scope, $area) {
            return $scope.$("clearCacheEnabled");
          }
        }, {
          key: 'onChange',
          expr: function expr($scope, $area) {
            return $scope.$action(function () {
              return $scope.$("setClearCacheEnabled").apply(void 0, arguments);
            }, $area);
          }
        }]
      }, {
        key: 'v5',
        name: 'li'
      }, {
        key: 'v6',
        name: 'Checkbox',
        props: [{
          key: 'checked',
          expr: function expr($scope, $area) {
            return $scope.$("corsEnabled");
          }
        }, {
          key: 'onChange',
          expr: function expr($scope, $area) {
            return $scope.$action(function () {
              return $scope.$("setCorsEnabled").apply(void 0, arguments);
            }, $area);
          }
        }]
      }]
    }
  };
  function render1(area) {
    return V('Checkbox', area.p('v4'), ["Enable Clear Cache"]);
  }
  function render2(area) {
    return V('li', area.p('v3'), [render1(area)]);
  }
  function render3(area) {
    return V('Checkbox', area.p('v6'), ["Enable CORS"]);
  }
  function render4(area) {
    return V('li', area.p('v5'), [render3(area)]);
  }
  function render5(area) {
    return V('ul', area.p('v2'), [render2(area), render4(area)]);
  }
  function render6(area) {
    return V('div', area.p('v1'), [render5(area)]);
  }
  function render7(area) {
    return V('Fragment', null, [render6(area)]);
  }
  return function (controller) {
    return Object(external_window_Recore_["X"])(controller.__m(A.a1), render7);
  };
}