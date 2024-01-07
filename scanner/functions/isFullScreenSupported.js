function isFullScreenSupported(doc) {
  const body = doc.body;
  return !!(
    body['webkitRequestFullscreen'] ||
    (body.requestFullscreen && doc.fullscreenEnabled)
  );
}