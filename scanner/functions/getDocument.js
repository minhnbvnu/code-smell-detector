function getDocument() {
  if (document_ === undefined && typeof document !== 'undefined') {
    document_ = document.implementation.createDocument('', '', null);
  }
  return document_;
}