function blobToDataUri(blob) {
      return new Promise(function (resolve) {
        var reader = new domGlobals.FileReader();
        reader.onloadend = function () {
          resolve(reader.result);
        };
        reader.readAsDataURL(blob);
      });
    }