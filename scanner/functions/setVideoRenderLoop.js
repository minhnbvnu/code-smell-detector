function setVideoRenderLoop(videoElement, options, checkboxland) {
  renderMediaAsCheckboxes(videoElement, options, checkboxland);
  refreshId = requestAnimationFrame(() => setVideoRenderLoop(videoElement, options, checkboxland));
}