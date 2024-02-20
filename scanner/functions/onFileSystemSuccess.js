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