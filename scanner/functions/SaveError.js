function SaveError(e) {
    $ionicLoading.show({
      template: $translate.instant('kErrorSave'),
      noBackdrop: true,
      duration: 3000
    });
    NVR.log("Error saving image: " + e);
    //console.log("***ERROR");
  }