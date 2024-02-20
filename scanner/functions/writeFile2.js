function writeFile2(path, file, blob, isAppend) {
      var csize = 4 * 1024 * 1024; // 4MB
      var d = $q.defer();
      NVR.debug("Inside writeFile2 with blob size=" + blob.size);

      // nothing more to write, so all good?
      if (!blob.size) {
        NVR.debug("writeFile2 all done");
        d.resolve(true);
        return $q.resolve(true);
      }


      if (!isAppend) {
        // return the delegated promise, even if it fails
        return $cordovaFile.writeFile(path, file, blob.slice(0, csize), true)
          .then(function (succ) {
            return writeFile2(path, file, blob.slice(csize), true);
          });
      } else {
        // return the delegated promise, even if it fails
        return $cordovaFile.writeExistingFile(path, file, blob.slice(0, csize))
          .then(function (succ) {
            return writeFile2(path, file, blob.slice(csize), true);
          });
      }


    }