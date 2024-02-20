function controlZM(str) {
    if (inProgress) {
      NVR.debug("StateCtrl/controlZM: operation in progress");
      $ionicPopup.alert({
        title: $translate.instant('kOperationInProgressTitle'),
        template: $translate.instant('kOperationInProgressBody') + '...',
        okText: $translate.instant('kButtonOk'),
        cancelText: $translate.instant('kButtonCancel'),
      });
      return;
    }

    var statesearch = "startstoprestart";

    var promptstring = $translate.instant('kStateAreYouSure') + str + ' Zoneminder?';
    if (statesearch.indexOf(str) == -1) {
      promptstring = "Are you sure you want to change state to " + str;
    }

    $rootScope.zmPopup = $ionicPopup.show({
      title: $translate.instant('kPleaseConfirm'),
      template: promptstring,
      buttons: [{
          text: $translate.instant('kButtonCancel'),
          type: 'button-positive'
        },
        {
          text: $translate.instant('kButtonOk'),
          type: 'button-assertive',
          onTap: function (e) {
            performZMoperation(str);
          }
        }
      ]
    });

  }