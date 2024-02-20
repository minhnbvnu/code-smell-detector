function openModal(event) {

    //console.log (JSON.stringify(event));

    if ($scope.modalFromTimelineIsOpen == true) {
      // don't know why but some conflict from angular to timeline_instance lib
      // results in double modals at times
      NVR.log(">>-- duplicate modal detected, preventing");
    }

    $scope.modalFromTimelineIsOpen = true;
    NVR.setAwake(NVR.getKeepAwake());

    // pass this event to ModalCtrl
    $scope.currentEvent = event;

    $scope.event = event;
    // in Timeline view, make sure events stick to same monitor
    $scope.followSameMonitor = "1";

    //prepareModalEvent(event.Event.Id);

    var ld = NVR.getLogin();
    var sl = 'disabled';
    if (ld.showLiveForInProgressEvents) {
      sl = 'enabled';
    }

    $scope.modalData = {
      doRefresh: false
    };
    $ionicModal.fromTemplateUrl('templates/events-modal.html', {
        scope: $scope, // give ModalCtrl access to this scope
        animation: 'slide-in-up',
        id: 'footage',
        showLive: sl,
        disableDrag: true
      })
      .then(function (modal) {
        $scope.modal = modal;

        $ionicLoading.show({
          template: $translate.instant('kPleaseWait') + "...",
          noBackdrop: true,
          duration: 10000,

        });

        $scope.modal.show();

        var ld = NVR.getLogin();

      });

  }