function createStyle({textAlign, justify}) {
  return new Style({
    image: new CircleStyle({
      radius: 10,
      fill: new Fill({color: 'rgba(255, 0, 0, 0.1)'}),
      stroke: new Stroke({color: 'red', width: 1}),
    }),
    text: new Text({
      font: '16px sans-serif',
      textAlign,
      justify,
      text:
        `Justify text inside box\ntextAlign: ${textAlign}` +
        (justify ? `\njustify: ${justify}` : ''),
      fill: new Fill({
        color: [255, 255, 255, 1],
      }),
      backgroundFill: new Fill({
        color: [168, 50, 153, 0.6],
      }),
      padding: [2, 2, 2, 2],
    }),
  });
}