function saveLiveImageToPhone(mid) {
    $ionicLoading.show({
      template: $translate.instant('kSavingSnapshot') + '...',
      noBackdrop: true,
      duration: zm.httpTimeout
    });

    NVR.debug("ModalCtrl: SaveLiveImageToPhone called");
    var canvas, context, imageDataUrl, imageData;
    var loginData = NVR.getLogin();
    var url = loginData.streamingurl +
      '/zms?mode=single&monitor=' + mid;
      url += $rootScope.authSession;


    url += NVR.insertSpecialTokens();

    NVR.log("SavetoPhone:Trying to save image from " + url);

    if ($rootScope.platformOS != 'desktop') {
      var album = 'zmNinja';
      NVR.debug("Trying to save image to album: " + album);
      cordova.plugins.photoLibrary.requestAuthorization(
        function () {
          //url = "https://picsum.photos/200/300/?random";

          var fileTransfer = new FileTransfer();
          var urle = encodeURI(url);
          var timestamp=moment().format('MMM-Do-YY-HH-mm-ss');
          var fname = "zmninja-mid-"+mid+'-'+timestamp+".jpg";

          fileTransfer.download(urle, cordova.file.dataDirectory + fname,
            function (entry) {
              NVR.debug("local download complete: " + entry.toURL());
              NVR.debug("Now trying to move it to album");
              cordova.plugins.photoLibrary.saveImage(entry.nativeURL, album,
                function (cameraRollAssetId) {
                  SaveSuccess();
                  $cordovaFile.removeFile(cordova.file.dataDirectory, fname)
                    .then(
                      function () {
                        NVR.debug("file removed from data directory");
                      },
                      function (e) {
                        NVR.debug("could not delete temp file: " + JSON.stringify(e));
                      }
                    );


                },
                function (err) {
                  NVR.debug("Saving error:" + JSON.stringify(err));
                  SaveError();

                });

            },
            function (err) {
              NVR.debug("error downloading:" + JSON.stringify(err));
              SaveError();
            }, !loginData.enableStrictSSL, {});




          // User gave us permission to his library, retry reading it!
        },
        function (err) {
          // User denied the access
          NVR.debug("Permission not granted");
          SaveError();
        }, // if options not provided, defaults to {read: true}.

        {
          read: true,
          write: true
        }
      );
    } else {

      $ionicLoading.hide();
      //SaveSuccess();

      $ionicLoading.show({
        template: $translate.instant('kPleaseWait') + "...",
        noBackdrop: true
      });
      var timestamp=moment().format('MMM-Do-YY-HH-mm-ss');
      var fname = "zmninja-mid-"+mid+'-'+timestamp+".jpg";
      fetch(url).then(function (resp) {
        return resp.blob();
      }).then(function (blob) {
        console.log (blob);
        var url = window.URL.createObjectURL(blob);
        $rootScope.zmPopup = SecuredPopups.show('alert', {
          title: $translate.instant('kNote'),
          template: $translate.instant('kDownloadVideoImage') + "<br/><br/><center><a href='" + url + "' class='button button-assertive icon ion-android-download' download='"+fname+"'>" + " " + $translate.instant('kDownload') + "</a></center>",
          okText: $translate.instant('kDismiss'),
          okType: 'button-stable'
        });

        $rootScope.zmPopup.then (function (res) {
          //console.log ('DONE RELEASE');
          NVR.debug ('download successful');
          $ionicLoading.hide();
          window.URL.revokeObjectURL(url);

        });
      }).catch(function () {
        $ionicLoading.hide();
        $ionicLoading.show({
          template: $translate.instant('kErrorSave'),
          noBackdrop: true,
          duration: 2000
        });
      });

    }

  }