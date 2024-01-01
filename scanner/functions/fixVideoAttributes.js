function fixVideoAttributes (videoEl) {
  videoEl.autoplay = videoEl.hasAttribute('autoplay') && videoEl.getAttribute('autoplay') !== 'false';
  videoEl.controls = videoEl.hasAttribute('controls') && videoEl.getAttribute('controls') !== 'false';
  if (videoEl.getAttribute('loop') === 'false') {
    videoEl.removeAttribute('loop');
  }
  if (videoEl.getAttribute('preload') === 'false') {
    videoEl.preload = 'none';
  }
  videoEl.crossOrigin = videoEl.crossOrigin || 'anonymous';
  // To support inline videos in iOS webviews.
  videoEl.setAttribute('playsinline', '');
  videoEl.setAttribute('webkit-playsinline', '');
  return videoEl;
}