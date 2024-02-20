function getDirectory(dir, options) {
      var q = $q.defer();
      getFilesystem().then(function (filesystem) {
        filesystem.root.getDirectory(dir, options, q.resolve, q.reject);
      }, q.reject);
      return q.promise;
    }