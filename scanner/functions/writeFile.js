function writeFile(path, __filename, __data) {
      var d = $q.defer();
      //console.log ("inside write file");
      window.requestFileSystem(LocalFileSystem.TEMPORARY, __data.size + 5000, onFileSystemSuccess, fail);

      function fail(e) {
        var msg = '';

        switch (e.code) {
          case FileError.QUOTA_EXCEEDED_ERR:
            msg = 'QUOTA_EXCEEDED_ERR';
            break;
          case FileError.NOT_FOUND_ERR:
            msg = 'NOT_FOUND_ERR';
            break;
          case FileError.SECURITY_ERR:
            msg = 'SECURITY_ERR';
            break;
          case FileError.INVALID_MODIFICATION_ERR:
            msg = 'INVALID_MODIFICATION_ERR';
            break;
          case FileError.INVALID_STATE_ERR:
            msg = 'INVALID_STATE_ERR';
            break;
          default:
            msg = 'Unknown Error';
            break;
        }

        //console.log('Error: ' + msg);
      }

      function onFileSystemSuccess() {
        // console.log ("Got temporary FS");
        window.resolveLocalFileSystemURL(path, function (dir) {
            dir.getFile(__filename, {
              create: true
            }, function (file) {
              file.createWriter(function (fileWriter) {
                //var blob = new Blob([__data], {type:'text/plain'});
                // console.log ("about to write "+__data.size+" bytes");
                //var blob = new Blob([__data], {type:'text/plain'});
                fileWriter.write(__data);
                fileWriter.onwrite = function (e) {
                  NVR.debug("write complete");
                  d.resolve();
                  return d.promise;
                };

                fileWriter.onerror = function (e) {
                  NVR.debug("write error in filewriter:" + JSON.stringify(e));
                  d.reject();
                  return d.promise;
                };

              });
            });

          },
          function (err) {
            d.reject(err);
            return d.promise;
          });
      }
      return d.promise;
    }