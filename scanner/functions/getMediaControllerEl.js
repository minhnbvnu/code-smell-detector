function getMediaControllerEl(controlEl) {
  const mediaControllerId = controlEl.getAttribute(
    MediaStateReceiverAttributes.MEDIA_CONTROLLER
  );
  if (mediaControllerId) {
    return controlEl.getRootNode()?.getElementById(mediaControllerId);
  }
  return closestComposedNode(controlEl, 'media-controller');
}