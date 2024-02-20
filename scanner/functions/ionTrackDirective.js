function ionTrackDirective(domEventName) { // eslint-disable-line
    return ['$ionicAnalytics', '$ionicGesture', function($ionicAnalytics, $ionicGesture) {

      var gestureDriven = [
        'drag', 'dragstart', 'dragend', 'dragleft', 'dragright', 'dragup', 'dragdown',
        'swipe', 'swipeleft', 'swiperight', 'swipeup', 'swipedown',
        'tap', 'doubletap', 'hold',
        'transform', 'pinch', 'pinchin', 'pinchout', 'rotate'
      ];
      // Check if we need to use the gesture subsystem or the DOM system
      var isGestureDriven = false;
      for (var i = 0; i < gestureDriven.length; i++) {
        if (gestureDriven[i] === domEventName.toLowerCase()) {
          isGestureDriven = true;
        }
      }
      return {
        "restrict": 'A',
        "link": function($scope, $element, $attr) {
          var capitalized = domEventName[0].toUpperCase() + domEventName.slice(1);
          // Grab event name we will send
          var eventName = $attr['ionTrack' + capitalized];

          if (isGestureDriven) {
            var gesture = $ionicGesture.on(domEventName, handler, $element);
            $scope.$on('$destroy', function() {
              $ionicGesture.off(gesture, domEventName, handler);
            });
          } else {
            $element.on(domEventName, handler);
            $scope.$on('$destroy', function() {
              $element.off(domEventName, handler);
            });
          }


          function handler(e) {
            var eventData = $scope.$eval($attr.ionTrackData) || {};
            if (eventName) {
              $ionicAnalytics.track(eventName, eventData);
            } else {
              $ionicAnalytics.trackClick(e.pageX, e.pageY, e.target, {
                "data": eventData
              });
            }
          }
        }
      };
    }];
  }