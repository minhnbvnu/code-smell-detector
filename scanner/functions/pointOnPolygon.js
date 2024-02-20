function pointOnPolygon(point, polygon, epsilon = 0){
  let on = false;
  const closed = close(polygon);
  
  for (let i = 0, l = closed.length - 1; i < l; i++){
    if (pointOnLine(point, [closed[i], closed[i + 1]], epsilon)){
      on = true;
      break;
    }
  }
  
  return on;
}