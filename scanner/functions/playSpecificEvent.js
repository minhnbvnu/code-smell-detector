function playSpecificEvent(eid) {
      NVR.log("Stuffing EID to play back " + eid);
      $rootScope.tappedEid = 0;
      var event = {
        Event: {
          Id: eid
        }

      };
      $scope.event = event;
      $scope.currentEvent = event;
      openModal(event, 'enabled');

    }