function isFullScreen(doc) {
  return !!(doc['webkitIsFullScreen'] || doc.fullscreenElement);
}