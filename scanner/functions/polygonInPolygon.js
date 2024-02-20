function polygonInPolygon(polygonA, polygonB){
  let inside = true;
  const closed = close(polygonA);
  
  for (let i = 0, l = closed.length - 1; i < l; i++){
    const v0 = closed[i];
    
    // Points test  
    if (!pointInPolygon(v0, polygonB)){
      inside = false;
      break;
    }
    
    // Lines test
    if (lineIntersectsPolygon([v0, closed[i + 1]], polygonB)){
      inside = false;
      break;
    }
  }
  
  return inside;
}