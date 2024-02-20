function polygonRotate(polygon, angle, origin){
  let p = [];

  for (let i = 0, l = polygon.length; i < l; i++){
    p[i] = pointRotate(polygon[i], angle, origin);
  }
  
  return p;
}