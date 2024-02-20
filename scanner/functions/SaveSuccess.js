function SaveSuccess() {
    $ionicLoading.show({
      template: $translate.instant('kDone'),
      noBackdrop: true,
      duration: 3000
    });
    NVR.debug("ModalCtrl:Photo saved successfuly");
  }