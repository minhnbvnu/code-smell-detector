function getBoundsElement(host) {
  return (
    (host.getAttribute('bounds')
      ? closestComposedNode(host, `#${host.getAttribute('bounds')}`)
      : getMediaController(host) || host.parentElement) ?? host
  );
}