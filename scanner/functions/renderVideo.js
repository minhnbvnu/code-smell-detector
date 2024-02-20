function renderVideo(dataSource, options) {
  const checkboxland = this;
  let videoEl;

  // FOR PASSING A URL TO A VIDEO
  if (typeof dataSource === 'string') {
    videoEl = document.createElement("video");
    videoEl.loop = true;
    videoEl.controls = true;
    videoEl.autoplay = true;
    videoEl.muted = true; // enables autoplay on iOS
    videoEl.crossOrigin = 'anonymous'; // allow cross-origin loading.
    videoEl.addEventListener('loadeddata', () => {
      videoEl.play();
      setVideoRenderLoop(videoEl, options, checkboxland)
    }, { once: true });
    videoEl.src = dataSource;
  } else
  // FOR PASSING A <VIDEO> ELEMENT
  if (typeof dataSource === 'object') {
    if (dataSource.readyState === 4) {
      setVideoRenderLoop(dataSource, options, checkboxland);
    } else {
      dataSource.addEventListener('loadeddata', () => setVideoRenderLoop(dataSource, options, checkboxland), { once: true });
    }
  }
}