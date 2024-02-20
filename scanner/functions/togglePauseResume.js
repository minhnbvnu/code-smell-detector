function togglePauseResume(props) {
  if (props.isAllComplete) return;

  if (!props.resumableUploads) {
    return props.cancelAll();
  }

  if (props.isAllPaused) {
    return props.resumeAll();
  }

  return props.pauseAll();
}