function getFileEntry(path, options) {
      var q = $q.defer();
      getFilesystem().then(function (filesystem) {
        filesystem.root.getFile(path, options, q.resolve, q.reject);
      }, q.reject);
      return q.promise;
    }