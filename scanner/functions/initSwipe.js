function initSwipe() {
      // Throw an exception if the `element` property is not set
      if (!SwipeCtrl.element) {
        throw 'Swipe requires an element to work.';
      }
      
      // Force a $digest on slide change while preserving the user's callback
      var userCallback = SwipeCtrl.options.callback || function(){};      
      SwipeCtrl.options.callback = function(index, elem) {
        $scope.$apply();
        userCallback(index, elem);
      };

      var dragStartCallback = SwipeCtrl.options.callback || function(){};
      SwipeCtrl.options.dragStart = function(index, elem) {
        $scope.$apply();
        dragStartCallback(index, elem);
      }

      var dragEndCallback = SwipeCtrl.options.callback || function(){};
      SwipeCtrl.options.dragEnd = function(index, elem) {
        $scope.$apply();
        dragEndCallback(index, elem);
      }
      // Create a new Swipe instance and store the returned api
      var api = new Swipe(SwipeCtrl.element, SwipeCtrl.options);

      // Clone the Swipe API onto the controller
      for (var a in api) {
        SwipeCtrl[a] = api[a];
      }
    }