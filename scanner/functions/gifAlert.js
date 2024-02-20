function gifAlert(e) {
      if (navigator.userAgent.toLowerCase().indexOf('crosswalk') == -1) {
        $ionicPopup.confirm({
          title: $translate.instant('kNote'),
          template: "{{'kGifWarning' | translate }}",
          okText: $translate.instant('kButtonOk'),
          cancelText: $translate.instant('kButtonCancel'),
        }).then(function (res) {
          if (res) {
            downloadAsGif2(e);
          } else
            NVR.debug("User cancelled GIF");

        });
      } else {
        $ionicPopup.alert({
          title: $translate.instant('kNote'),
          template: "{{'kGifNoCrosswalk' | translate}}"
        });
      }


    }