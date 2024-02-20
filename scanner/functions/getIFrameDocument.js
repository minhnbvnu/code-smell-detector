function getIFrameDocument(iframe) {
// Adapted from http://xkr.us/articles/dom/iframe-document/
  const outer = iframe.contentWindow || iframe.contentDocument;
  return outer.document || outer;
}