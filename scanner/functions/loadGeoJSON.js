function loadGeoJSON (url, options = {}) {
  if (typeof url === 'object') {
    postMessage('load');
    processGeoJSON(url, options);
  } else {
    Request.getJSON(url, (err, geojson) => {
      if (err) {
        postMessage('error');
      } else {
        postMessage('load');
        processGeoJSON(geojson, options);
      }
    });
  }
}