function getPointAtIndex(vertices, i, isFlatArray = false) {
  let point = null;
  if (isFlatArray) {
    point = vertices.slice(i * 3, i * 3 + 3);
  } else {
    point = vertices[i];
  }

  point[2] = point[2] || 0;
  return point;
}