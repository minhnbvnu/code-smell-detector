function getLogfile() {
      var q = $q.defer();

      if (isBrowser()) {
        q.resolve($window.localStorage[storageFilename]);
      } else {

        if (!$window.cordova || !$window.cordova.file || !$window.cordova.file.dataDirectory) {
          q.reject('cordova.file.dataDirectory is not available');
          return q.promise;
        }

        $cordovaFile.readAsText(cordova.file.dataDirectory, storageFilename).then(
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