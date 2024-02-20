function moveToGallery(path, fname) {

        NVR.debug("moveToGallery called with " + path);
        LibraryHelper.saveVideoToLibrary(onSuccess, onError, path, fname);

        function onSuccess(results) {
          $ionicLoading.hide();
          NVR.debug("Removing temp file");

          if ($rootScope.platformOS == 'ios')
            $cordovaFile.removeFile(cordova.file.documentsDirectory, "temp-video.mp4");
          else
            $cordovaFile.removeFile(cordova.file.dataDirectory, "temp-video.mp4");

        }

        function onError(error) {
          $ionicLoading.hide();
          NVR.debug("Error: " + error);

        }
      }