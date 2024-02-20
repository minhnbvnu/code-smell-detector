function getIndices(object, bounds) {
  let indices = [];

  let verticalMidpoint = bounds.x + bounds.width / 2;
  let horizontalMidpoint = bounds.y + bounds.height / 2;

  // save off quadrant checks for reuse
  let intersectsTopQuadrants = object.y < horizontalMidpoint;
  let intersectsBottomQuadrants =
    object.y + object.height >= horizontalMidpoint;

  // object intersects with the left quadrants
  if (object.x < verticalMidpoint) {
    if (intersectsTopQuadrants) {
      // top left
      indices.push(0);
    }

    if (intersectsBottomQuadrants) {
      // bottom left
      indices.push(2);
    }
  }

  // object intersects with the right quadrants
  if (object.x + object.width >= verticalMidpoint) {
    if (intersectsTopQuadrants) {
      // top right
      indices.push(1);
    }

    if (intersectsBottomQuadrants) {
      // bottom right
      indices.push(3);
    }
  }

  return indices;
}