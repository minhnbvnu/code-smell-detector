function getXMLSerializer() {
  if (xmlSerializer_ === undefined && typeof XMLSerializer !== 'undefined') {
    xmlSerializer_ = new XMLSerializer();
  }
  return xmlSerializer_;
}