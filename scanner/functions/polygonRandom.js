function polygonRandom(sides = 3, area = 100, centroid = [0, 0]) {
  const r = Math.sqrt(area / Math.PI),
        xs = Array.from({ length: sides }, () => 2 * r * Math.random()),
        ys = Array.from({ length: sides }, () => 2 * r * Math.random());
  
  xs.sort((a, b) => a - b);
  ys.sort((a, b) => a - b);

  const vecXS = chain(xs, xs[0], xs[xs.length-1]),
        vecYS = chain(ys, ys[0], ys[ys.length-1]);

  shuffle(vecYS);

  //Make polygon coordinates from the vecs by laying them out end to end
  let polygon = [],
      x = 0, y = 0;
  
  // Zip the vector arrays together
  // Then, sort the vectors by angle, in a counter clockwise fashion. 
  // a and b are tuples representing vectors. Compute angle for each vector and compare them.
  const vecs = vecXS
    .map((d, i) => [d, vecYS[i]])
    .sort((a, b) => Math.atan2(b[1], b[0]) - Math.atan2(a[1], a[0]))
    .forEach(vec => {
      x += vec[0] * 1;
      y += vec[1] * 1;
      polygon.push([x,y])
    });

  // Scale and translate
  const c = polygonCentroid(polygon);
  
  return polygonTranslate(
    polygonScaleArea(polygon, area / polygonArea(polygon)),
    lineAngle([c, centroid]),
    lineLength([c, centroid])
  );
}