function fakeStorageGet(data, thumbprint, protocol) {
    return function(key) {
      var val;

      switch (key) {
        case 'data':
          val = data;
          break;
        case 'protocol':
          val = protocol || location.protocol;
          break;
        case 'thumbprint':
          val = thumbprint;
          break;
      }

      return val;
    };
  }