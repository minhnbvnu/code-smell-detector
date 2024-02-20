function getAttributeMediaController(host) {
  const { MEDIA_CONTROLLER } = MediaStateReceiverAttributes;
  const mediaControllerId = host.getAttribute(MEDIA_CONTROLLER);

  if (mediaControllerId) {
    return /** @type MediaController */ (
      /** @type {unknown} */ (
        getDocumentOrShadowRoot(host)?.getElementById(mediaControllerId)
      )
    );
  }
}