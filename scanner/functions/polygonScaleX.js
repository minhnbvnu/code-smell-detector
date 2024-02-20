function polygonScaleX(polygon, scale, origin){
  if (!origin){
    origin = polygonCentroid(polygon);
  }

  let p = [];

  for (let i = 0, l = polygon.length; i < l; i++){
    const v = polygon[i],
          d = lineLength([origin, v]),
          a = lineAngle([origin, v]),
          t = pointTranslate(origin, a, d * scale);

    p[i] = [t[0], v[1]];
  }

  return p;
}