function getAbsoluteFile(path) {
      var q = $q.defer();
      $window.resolveLocalFileSystemURL(path, function (fileEntry) {
        fileEntry.file(q.resolve, q.reject);
      }, q.reject);
      return q.promise;
    }