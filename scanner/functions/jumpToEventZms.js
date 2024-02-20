function jumpToEventZms(connkey, dirn) {

    /* if ($scope.defaultVideo !== undefined && $scope.defaultVideo != '')
     {
         jumpToEventVideo (dirn);
         return;

     }*/


    var cmd = dirn == 1 ? '13' : '12';
    $scope.d_eventId = "...";
    NVR.debug("Sending " + cmd + " to " + connkey);

    $ionicLoading.show({
      template: $translate.instant('kSwitchingEvents') + "...",
      noBackdrop: true,
      duration: zm.httpTimeout
    });

    //console.log("Send command connkey: " + connkey);




    sendCommand(cmd, connkey)
      .then(
        function (success) {
          //console.log ("jump success " + JSON.stringify(success));
          $ionicLoading.hide();
        },
        function (error) {

          NVR.debug("Hmm jump  error " + JSON.stringify(error));
          NVR.stopNetwork("EventModalCtrl-jumptoEventZms error");
          $scope.connKey = NVR.genConnKey();
          //  console.log ("********* OFFSET FROM JUMPTOEVENTZMS ERROR");
          $timeout(function () {
            sendCommand('14', $scope.connKey, '&offset=' + $scope.currentProgress.progress);
          }, 500);
          NVR.debug("so I'm regenerating Connkey to " + $scope.connKey);
          //$timeout.cancel(eventQueryHandle);
          // eventQueryHandle  =  $timeout (function(){checkEvent();}, zm.eventPlaybackQuery);
          $ionicLoading.hide();
        });
    var slidein;
    var slideout;
    if (dirn == 1) {
      slideout = "animated slideOutLeft";
      slidein = "animated slideInRight";
    } else {
      slideout = "animated slideOutRight";
      slidein = "animated slideInLeft";
    }
    var element = angular.element(document.getElementById("full-screen-event"));
    element.addClass(slideout).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', outWithOld);

    function outWithOld() {

      $timeout(function () {
        element.removeClass(slideout);
        element.addClass(slidein)
          .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', inWithNew);

      }, 200);
    }

    function inWithNew() {
      element.removeClass(slidein);

    }

  }