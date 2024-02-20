function swipeWrap($timeout) {
    return {
      restrict: 'EA',
      replace: true,
      controller: SwipeController,
      controllerAs: 'SwipeCtrl',
      link: function(scope, element, attrs, Controller) {
        // Kickstart the Swipe Slider
        // Use $timeout so the controller will be inited at the end of the cycle
        // This is needed when you are using ng-repeat and other async stuff
        $timeout(Controller.init);
      }
    };
  }