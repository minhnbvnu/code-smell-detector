function getDocumentDimensions(element) {
  var _ownerDocument$docume, _ownerDocument$docume2;

  var ownerDocument = getOwnerDocument(element);
  var ownerWindow = ownerDocument.defaultView || window;

  if (!ownerDocument) {
    return {
      width: 0,
      height: 0
    };
  }

  return {
    width: (_ownerDocument$docume = ownerDocument.documentElement.clientWidth) != null ? _ownerDocument$docume : ownerWindow.innerWidth,
    height: (_ownerDocument$docume2 = ownerDocument.documentElement.clientHeight) != null ? _ownerDocument$docume2 : ownerWindow.innerHeight
  };
}