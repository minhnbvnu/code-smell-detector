function readStyleURL(node) {
  // KML files in the wild occasionally forget the leading
  // `#` on styleUrlsdefined in the same document.
  const s = getAllTextContent(node, false)
    .trim()
    .replace(/^(?!.*#)/, '#');
  let baseURI = node.baseURI;
  if (!baseURI || baseURI == 'about:blank') {
    baseURI = window.location.href;
  }
  if (baseURI) {
    const url = new URL(s, baseURI);
    return url.href;
  }
  return s;
}