function onInfinite() {
    ionic.requestAnimationFrame(function() {
      $element[0].classList.add('active');
    });
    self.isLoading = true;
    $scope.$parent && $scope.$parent.$apply($attrs.onInfinite || '');
  }