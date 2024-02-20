function getMediaControllerElement(host) {
  const mediaControllerId = host.getAttribute(
    MediaStateReceiverAttributes.MEDIA_CONTROLLER
  );
  if (mediaControllerId) {
    return host.getRootNode()?.getElementById(mediaControllerId);
  }
  return closestComposedNode(host, 'media-controller');
}