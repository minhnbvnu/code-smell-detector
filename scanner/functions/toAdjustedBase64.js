function toAdjustedBase64(type, quality) {
        return toAdjustedDataURL(type, quality).then(function (dataurl) {
          return dataurl.split(',')[1];
        });
      }