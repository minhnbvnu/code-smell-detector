function polygonTranslate(polygon, angle, distance){
  let p = [];

  for (let i = 0, l = polygon.length; i < l; i++){
    p[i] = pointTranslate(polygon[i], angle, distance);
  }
  
  return p;
}