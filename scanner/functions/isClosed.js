function isClosed(polygon){
  const first = polygon[0],
        last = polygon[polygon.length - 1];
  return first[0] === last[0] && first[1] === last[1];
}