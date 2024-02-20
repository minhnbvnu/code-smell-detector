function downloadAsGif(e) {
      $ionicLoading.show({
        template: $translate.instant('kPleaseWait') + "...",
        noBackdrop: true,
        duration: 20000
      });

      prepareImages(e)
        .then(function (imgs) {

            // console.log("TOTAL IMAGES TO GIF=" + imgs.length);
            //console.log(JSON.stringify(imgs));

            var ad = adjustAspect(e);
            //console.log("SAVING W=" + ad.w + " H=" + ad.h);
            NVR.setAwake(true);
            gifshot.createGIF({

              'gifWidth': ad.w,
              'gifHeight': ad.h,
              'images': imgs,
              'interval': 1,
              //'loop':null,
              'sampleInterval': 20,
              //'frameDur':5, // 1/2 a sec
              'text': 'zmNinja',
              'crossOrigin': 'use-credentials',
              'progressCallback': function (cp) {
                var p = Math.round(cp * 100);
                $ionicLoading.show({
                  template: $translate.instant('kPleaseWait') + "...(" + p + "%)",
                  noBackdrop: true
                });
              }
            }, function (obj) {
              NVR.setAwake(false);
              if (!obj.error) {
                //console.log(obj.image);

                var blob;

                if ($rootScope.platformOS == 'desktop') {

                  obj.image = obj.image.replace(/data:image\/gif;base64,/, '');
                  blob = base64toBlob(obj.image, "image/gif");
                  var f = NVR.getMonitorName(e.Event.MonitorId);
                  f = f + "-" + e.Event.Id + ".gif";
                  saveAs(blob, f);
                  $ionicLoading.hide();
                } else {
                  NVR.debug("Saving blob to gallery...");
                  var album = "zmNinja";
                  cordova.plugins.photoLibrary.saveImage(obj.image, album,
                    function () {
                      $ionicLoading.hide();
                      NVR.debug("Event saved");
                    },
                    function (err) {
                      $ionicLoading.hide();
                      NVR.debug("Saving ERROR=" + err);
                    });

                }

              } else {
                $ionicLoading.hide();
                NVR.log("Error creating GIF");
              }
            });
          },
          function (err) {
            $ionicLoading.hide();
            NVR.log("Error getting frames");
          }

        );
    }