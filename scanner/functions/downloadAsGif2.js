function downloadAsGif2(e) {
      $rootScope.isDownloading = true;
      $ionicLoading.show({
        template: $translate.instant('kPleaseWait') + "...",
        noBackdrop: true,
        duration: 20000
      });
      NVR.setAwake(true);

      prepareImages(e)
        .then(function (files) {
            return $http({
                url: files[0],
                responseType: "blob"
              })
              .then(function (res) {
                return res.data.image();
              })
              .then(function (img) {
                URL.revokeObjectURL(img.src); // Revoke object URL to free memory
                var stream = createGif(files, img.width, img.height);
                //var fileStream = streamSaver.createWriteStream('image.gif');

                var chunks = [];
                var reader = stream.getReader();

                function pull() {
                  return reader.read().then(function (result) {
                    chunks.push(result.value);
                    return result.done ? chunks : pull();
                  });
                }

                pull().then(function (chunks) {
                  var blob = new Blob(chunks, {
                    type: "image/gif"

                  });

                  //alert ("WE ARE DONE!");
                  if ($rootScope.platformOS == 'desktop') {
                    saveAs(blob, e.Event.Id + "-video.gif");
                    $ionicLoading.hide();
                  } else {
                    // write blob to file
                    var tp;
                    if ($rootScope.platformOS == 'ios')
                      tp = cordova.file.documentsDirectory;
                    else
                      tp = cordova.file.dataDirectory;
                    var th = true,
                      opt = {};

                    $ionicLoading.show({

                      template: "writing to file...",
                      noBackdrop: true,
                    });

                    //var bloburl = URL.createObjectURL(blob);
                    //NVR.debug ("blob-url is:"+bloburl);

                    writeFile2(tp, "temp-file.gif", blob, false)
                      .then(function (succ) {
                        NVR.debug("write to file successful");
                        //  console.log( "write file successful");
                        $ionicLoading.hide();

                        var ntp = tp;
                        //ntp = tp.indexOf('file://') === 0 ? tp.slice(7) : tp;

                        ntp = ntp + "temp-file.gif";
                        // console.log ("ntp="+ntp);

                        moveImageToGallery(ntp);
                        $rootScope.isDownloading = false;

                      }, function (err) {
                        $rootScope.isDownloading = false;
                        $ionicLoading.hide();
                        NVR.debug("error writing to file " + JSON.stringify(err));


                      });
                  }

                });
              });

          },
          function (err) {
            $ionicLoading.hide();
            NVR.setAwake(false);
            NVR.log("Error getting frames");
            $rootScope.isDownloading = false;
          }

        );

    }