function playbackFinished() {
    // currentEvent is updated with the currently playing event in prepareModalEvent()
    NVR.log("Playback of event " + currentEvent.Event.Id + " is finished");

    if ($scope.loginData.gapless) {

      neighborEvents(currentEvent.Event.Id, currentEvent.Monitor.Id)
        .then(function (success) {

            // lets give a second before gapless transition to the next event
            $timeout(function () {
              $scope.nextId = success.next;
              $scope.prevId = success.prev;
              NVR.debug("Gapless move to event " + $scope.nextId);
              playState = 'play';
              jumpToEvent($scope.nextId, 1);
            }, 1000);
          },
          function (error) {
            NVR.debug("Error in neighbor call " +
              JSON.stringify(error));
          });
    } else {
      NVR.debug("not going to next event, gapless is off");
    }
  }