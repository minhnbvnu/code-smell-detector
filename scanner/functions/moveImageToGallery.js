function moveImageToGallery(fname) {
      // this is https://github.com/terikon/cordova-plugin-photo-library

      NVR.debug("moveImageToGallery called with " + fname);
      cordova.plugins.photoLibrary.saveImage(fname, "zmNinja", onSuccess, onError);
      //LibraryHelper.saveImageToLibrary(onSuccess, onError, fname, "zmNinja");

      function onSuccess(results) {

        NVR.debug("Removing temp file");

        if ($rootScope.platformOS == 'ios') {
          $cordovaFile.removeFile(cordova.file.documentsDirectory, "temp-file.gif");
        } else
          $cordovaFile.removeFile(cordova.file.dataDirectory, "temp-file.gif");
        $ionicLoading.show({
          template: $translate.instant('kDone'),
          noBackdrop: true,
          duration: 2000
        });


      }

      function onError(error) {
        // console.log("Error: " + error);

      }
    }