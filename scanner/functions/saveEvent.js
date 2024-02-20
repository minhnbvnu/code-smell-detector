function saveEvent(t,eid) {

    NVR.debug ("saveEvent  in EventModalCtrl called with "+t+" and "+ eid);
    var fname;
    var fn = "cordova.plugins.photoLibrary.saveImage";
    var loginData = NVR.getLogin();

    $ionicLoading.show({
      template: $translate.instant('kPleaseWait') + "...",
      noBackdrop: true,
      duration: zm.httpTimeout
    });

    if ($scope.defaultVideo !== undefined && $scope.defaultVideo != '' && t != "image") {
      $scope.selectEventUrl = $scope.video_url;
      fname = "zmNinja-eid-"+eid+".mp4";
      fn = "cordova.plugins.photoLibrary.saveVideo";
    } else {
      fname = "zmNinja-eid-"+eid+".jpg";
    }

    NVR.debug("-->Going to try and download " + $scope.selectEventUrl);
    var url = $scope.selectEventUrl;

    if ($rootScope.platformOS != 'desktop') {
      var album = 'zmNinja';
      NVR.debug("Trying to save image to album: " + album);
      cordova.plugins.photoLibrary.requestAuthorization(
        function () {
          var fileTransfer = new FileTransfer();
          var urle = encodeURI(url);

          fileTransfer.onprogress = function (progressEvent) {
            if (progressEvent.lengthComputable) {

              $timeout(function () {
                var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
                $ionicLoading.show({
                  template: $translate.instant('kPleaseWait') + "... (" + perc + "%)",
                  noBackdrop: true,
                  //duration: zm.httpTimeout
                });
              });
            }
          };

          fileTransfer.download(urle, cordova.file.dataDirectory + fname,
            function (entry) {
              NVR.debug("local download complete: " + entry.toURL() + '. Now trying to move it to album');
              var pluginName = ((fname.indexOf('.mp4') != -1) ? "saveVideo" : "saveImage");

              cordova.plugins.photoLibrary[pluginName](entry.toURL(), album,
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
              NVR.log("error downloading:" + JSON.stringify(err));
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
      //desktop

      $ionicLoading.hide();
      $ionicLoading.show({
        template: $translate.instant('kPleaseWait') + "...",
        noBackdrop: true
      });

        fetch(url).then(function (resp) {
          return resp.blob();
        }).then(function (blob) {
          $ionicLoading.hide();

         // console.log (blob);
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
            window.URL.revokeObjectURL(url);
            $ionicLoading.hide();


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