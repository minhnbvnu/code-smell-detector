function getAnchorUrl(anchorEl) {
  return new url.URL(anchorEl.href, anchorEl.ownerDocument.defaultView.location.toString());
}