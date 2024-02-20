function swipeItem() {
    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      require: '^swipeSlider',
      template: '<div ng-transclude></div>'
    };
  }