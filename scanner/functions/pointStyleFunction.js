function pointStyleFunction(feature, resolution) {
  return new Style({
    image: new CircleStyle({
      radius: 10,
      fill: new Fill({color: 'rgba(255, 0, 0, 0.1)'}),
      stroke: new Stroke({color: 'red', width: 1}),
    }),
    text: createTextStyle(feature, resolution, myDom.points),
  });
}