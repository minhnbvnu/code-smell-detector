function keyboardHandler(evt) {
        if (evt.metaKey || evt.ctrlKey) {
          if (evt.keyCode == 76) {
            evt.preventDefault();
            NVR.log ("---> Lock pressed");
            if (!NVR.getLogin().usePin) {
              NVR.log ("not using pin, ignoring");
              return;
            }
            $ionicHistory.nextViewOptions({
              disableAnimate: true
            });
            if ($state.current.name != 'app.zm-portal-login') {
              $rootScope.lastState = $state.current.name;
              $rootScope.$stateParams = $stateParams;
              $state.go ('app.zm-portal-login');
            }
            else {
              NVR.log ("Already at portal, not going again");
            }

          }
        }
      }