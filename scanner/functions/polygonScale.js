function polygonScale(polygon, scale, origin){
  if (!origin){
    origin = polygonCentroid(polygon);
  }

  let p = [];

  for (let i = 0, l = polygon.length; i < l; i++){
    const v = polygon[i],
          d = lineLength([origin, v]),
          a = lineAngle([origin, v]);

    p[i] = pointTranslate(origin, a, d * scale);
  }

  return p;
}