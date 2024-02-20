function getPromisedFileReader(deferred) {
      var reader = new FileReader();
      reader.onloadend = function () {
        if (this.error)
          deferred.reject(this.error);
        else
          deferred.resolve(this.result);
      };
      return reader;
    }