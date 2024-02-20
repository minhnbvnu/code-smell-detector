function getMediaDevices() {
  // eslint-disable-next-line compat/compat
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // eslint-disable-next-line compat/compat
    return navigator.mediaDevices;
  }

  var _getUserMedia = navigator.mozGetUserMedia || navigator.webkitGetUserMedia;

  if (!_getUserMedia) {
    return null;
  }

  return {
    getUserMedia: function getUserMedia(opts) {
      return new Promise(function (resolve, reject) {
        _getUserMedia.call(navigator, opts, resolve, reject);
      });
    }
  };
}