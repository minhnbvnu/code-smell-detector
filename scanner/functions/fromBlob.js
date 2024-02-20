function fromBlob(blob) {
      return blobToDataUri(blob).then(function (uri) {
        return create$6(blobToCanvas(blob), blob, uri);
      });
    }