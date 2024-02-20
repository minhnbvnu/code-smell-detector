function getMediaController(host) {
  return (
    getAttributeMediaController(host) ??
    closestComposedNode(host, 'media-controller')
  );
}