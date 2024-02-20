function dPadHandler(evt) {
        var handled = false;

        var keyCodes = {
          MKEYB: 77,
          SELECT: 13,

          LEFT: 37,
          UP: 38,
          RIGHT: 39,
          DOWN: 40,

          PLAYPAUSE: 179,
          REWIND: 227,
          FORWARD: 228
        };

        $timeout(function () {
          var st = '#' + $rootScope.dpadState + '-move-';
          //  console.log ("IN STATE="+$rootScope.dpadState+ " with st="+st);
          var keyCode = evt.keyCode;
          var el, nextel;

          if (keyCode == keyCodes.REWIND) {
            if (!$ionicSideMenuDelegate.isOpen()) {
              $ionicSideMenuDelegate.toggleLeft();
              $rootScope.dpadState = "menu";
              $rootScope.dpadId = 0;

            } else {
              el = angular.element(document.querySelector(st + $rootScope.dpadId));
              if (el.length) el[0].classList.remove('dpadSelected');
              $ionicSideMenuDelegate.toggleLeft();
              $rootScope.dpadId = 0;
              $rootScope.dpadState = $state.current.name.replace('app.', "");
            }
            //console.log("dpad State is: " + $rootScope.dpadState);
            handled = true;
          } else if (keyCode == keyCodes.SELECT) { // select
            if ($rootScope.dpadId > 0) {
              el = angular.element(document.querySelector('#' + $rootScope.dpadState + '-move-' + $rootScope.dpadId));
              // if in menu, unselect
              if ($rootScope.dpadState == 'menu') {
                if (el.length) {
                  el[0].classList.remove('dpadSelected');
                  $rootScope.dpadId = 0;
                }
              }
              el.triggerHandler('click');

            }
            handled = true;
          }

          // arrows
          else if (keyCode >= keyCodes.LEFT && keyCode <= keyCodes.DOWN) {

            // might be open by mouse or other event, so check first
            if ($ionicSideMenuDelegate.isOpen() && $rootScope.dpadState != 'menu') {
              $rootScope.dpadState = "menu";
              $rootScope.dpadId = 0;
            }

            if ($rootScope.dpadId < 1) {
              // console.log ("First dpad usage with st="+st);
              $rootScope.dpadId = 1;

              //console.log ("looking for st="+st);
              el = angular.element(document.querySelector(st + '1'));
              if (el.length) {
                el[0].classList.add('dpadSelected');
                el[0].scrollIntoView();
              }

            } else {
              // unselect old
              //console.log ("looking for st="+st);
              el = angular.element(document.querySelector(st + $rootScope.dpadId));

              var nextId = (keyCode == keyCodes.LEFT || keyCode == keyCodes.UP) ? $rootScope.dpadId - 1 : $rootScope.dpadId + 1;
              nextel = angular.element(document.querySelector(st + nextId));
              if (nextel.length) {
                if (el.length) el[0].classList.remove('dpadSelected');
                nextel[0].classList.add('dpadSelected');
                nextel[0].scrollIntoView();
                $rootScope.dpadId = nextId;
              }
             // console.log("dpadID=" + $rootScope.dpadId + " with state=" + $rootScope.dpadState);
            }
            handled = true;
          }


          return handled;

        });
      }