function setStorageFilename(filename) {
      if (angular.isString(filename) && filename.length > 0) {
        storageFilename = filename;
        return true;
      } else {
        return false;
      }
    }