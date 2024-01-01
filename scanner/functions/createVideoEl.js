function createVideoEl (src, width, height) {
  var videoEl = document.createElement('video');
  videoEl.width = width;
  videoEl.height = height;
  // Support inline videos for iOS webviews.
  videoEl.setAttribute('playsinline', '');
  videoEl.setAttribute('webkit-playsinline', '');
  videoEl.autoplay = true;
  videoEl.loop = true;
  videoEl.crossOrigin = 'anonymous';
  videoEl.addEventListener('error', function () {
    warn('`$s` is not a valid video', src);
  }, true);
  videoEl.src = src;
  return videoEl;
}