function getFilesystem() {
      var q = $q.defer();
      try {
        $window.requestFileSystem($window.PERSISTENT, 1024 * 1024, q.resolve, q.reject);
      } catch (err) {
        q.reject(err);
      }
      return q.promise;
    }