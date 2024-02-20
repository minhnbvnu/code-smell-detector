function deleteLogfile() {
      var q = $q.defer();

      if (isBrowser()) {
        $window.localStorage.removeItem(storageFilename);
        q.resolve();
      } else {

        if (!$window.cordova || !$window.cordova.file || !$window.cordova.file.dataDirectory) {
          q.reject('cordova.file.dataDirectory is not available');
          return q.promise;
        }

        $cordovaFile.removeFile(cordova.file.dataDirectory, storageFilename).then(
          function(result) {
            q.resolve(result);
          },
          function(error) {
            q.reject(error);
          }
        );
      }

      return q.promise;
    }