function createMap(divId) {
  const source = new OSM();
  const layer = new TileLayer({
    source: source,
  });
  const map = new Map({
    layers: [layer],
    target: divId,
    view: new View({
      center: [0, 0],
      zoom: 2,
    }),
  });
  const zoomslider = new ZoomSlider();
  map.addControl(zoomslider);
  return map;
}