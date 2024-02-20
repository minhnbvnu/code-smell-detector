function swipeSlider() {
    return {
      restrict: 'EA',
      require: '^swipeWrap',
      scope: {
        options: '='
      },
      replace: true,
      transclude: true,
      template: '<div class="swipe"><div class="swipe-wrap" ng-transclude></div></div>',
      link: {
        pre: function(scope, element, attrs, Controller) {
          Controller.options = scope.options || {};
          Controller.element = element[0];
        }
      }
    };
  }