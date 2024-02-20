function checkFile() {
      var q = $q.defer();

      if (isBrowser()) {

        q.resolve({
          'name': storageFilename,
          'localURL': 'localStorage://localhost/' + storageFilename,
          'type': 'text/plain',
          'size': ($window.localStorage[storageFilename] ? $window.localStorage[storageFilename].length : 0)
        });

      } else {

        if (!$window.cordova || !$window.cordova.file || !$window.cordova.file.dataDirectory) {
          q.reject('cordova.file.dataDirectory is not available');
          return q.promise;
        }

        $cordovaFile.checkFile(cordova.file.dataDirectory, storageFilename).then(function(fileEntry) {
          fileEntry.file(q.resolve, q.reject);
        }, q.reject);

      }

      return q.promise;
    }