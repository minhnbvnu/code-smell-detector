function lineStyleFunction(feature, resolution) {
  return new Style({
    stroke: new Stroke({
      color: 'green',
      width: 2,
    }),
    text: createTextStyle(feature, resolution, myDom.lines),
  });
}