function blobToBase64(blob) {
      NVR.debug("converting blob to base64...");
      var d = $q.defer();
      var reader = new window.FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        var base64data = reader.result;
        //console.log(base64data );
        d.resolve(base64data);
        return d.promise;

      };
      return d.promise;
    }