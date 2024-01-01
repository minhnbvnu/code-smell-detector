function assetParse (value) {
  var el;
  var parsedUrl;

  // If an element was provided (e.g. canvas or video), just return it.
  if (typeof value !== 'string') { return value; }

  // Wrapped `url()` in case of data URI.
  parsedUrl = value.match(urlRegex);
  if (parsedUrl) { return parsedUrl[1]; }

  // ID.
  if (value.charAt(0) === '#') {
    el = document.getElementById(value.substring(1));
    if (el) {
      // Pass through media elements. If we have the elements, we don't have to call
      // three.js loaders which would re-request the assets.
      if (el.tagName === 'CANVAS' || el.tagName === 'VIDEO' || el.tagName === 'IMG') {
        return el;
      }
      return el.getAttribute('src');
    }
    warn('"' + value + '" asset not found.');
    return;
  }

  // Non-wrapped url().
  return value;
}