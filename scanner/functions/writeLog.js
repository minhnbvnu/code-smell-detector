function writeLog(message) {
      var q = $q.defer();

      if (isBrowser()) {
        // running in browser with 'ionic serve'

        if (!$window.localStorage[storageFilename]) {
          $window.localStorage[storageFilename] = '';
        }

        $window.localStorage[storageFilename] += message;
        q.resolve();

      } else {

        if (!$window.cordova || !$window.cordova.file || !$window.cordova.file.dataDirectory) {
          q.reject('cordova.file.dataDirectory is not available');
          return q.promise;
        }

        $cordovaFile.checkFile(cordova.file.dataDirectory, storageFilename).then(
          function() {
            // writeExistingFile(path, fileName, text)
            $cordovaFile.writeExistingFile(cordova.file.dataDirectory, storageFilename, message).then(
              function() {
                q.resolve();
              },
              function(error) {
                q.reject(error);
              }
            );
          },
          function() {
            // writeFile(path, fileName, text, replaceBool)
            $cordovaFile.writeFile(cordova.file.dataDirectory, storageFilename, message, true).then(
              function() {
                q.resolve();
              },
              function(error) {
                q.reject(error);
              }
            );
          }
        );

      }

      return q.promise;
    }