function initListener() {
            // window resize listener
            angular.element(win).bind('resize', function(event) {
              scope.slider.onresize();
            });
          }