function loadFeaturesXhr(
  url,
  format,
  extent,
  resolution,
  projection,
  success,
  failure,
) {
  const xhr = new XMLHttpRequest();
  xhr.open(
    'GET',
    typeof url === 'function' ? url(extent, resolution, projection) : url,
    true,
  );
  if (format.getType() == 'arraybuffer') {
    xhr.responseType = 'arraybuffer';
  }
  xhr.withCredentials = withCredentials;
  /**
   * @param {Event} event Event.
   * @private
   */
  xhr.onload = function (event) {
    // status will be 0 for file:// urls
    if (!xhr.status || (xhr.status >= 200 && xhr.status < 300)) {
      const type = format.getType();
      /** @type {Document|Node|Object|string|undefined} */
      let source;
      if (type == 'json') {
        source = JSON.parse(xhr.responseText);
      } else if (type == 'text') {
        source = xhr.responseText;
      } else if (type == 'xml') {
        source = xhr.responseXML;
        if (!source) {
          source = new DOMParser().parseFromString(
            xhr.responseText,
            'application/xml',
          );
        }
      } else if (type == 'arraybuffer') {
        source = /** @type {ArrayBuffer} */ (xhr.response);
      }
      if (source) {
        success(
          /** @type {Array<import("./Feature.js").default>} */
          (
            format.readFeatures(source, {
              extent: extent,
              featureProjection: projection,
            })
          ),
          format.readProjection(source),
        );
      } else {
        failure();
      }
    } else {
      failure();
    }
  };
  /**
   * @private
   */
  xhr.onerror = failure;
  xhr.send();
}