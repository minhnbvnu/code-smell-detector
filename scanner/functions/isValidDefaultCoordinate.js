function isValidDefaultCoordinate (possibleCoordinates, dimensions) {
  if (possibleCoordinates === null) { return true; }
  if (typeof possibleCoordinates !== 'object') { return false; }

  if (Object.keys(possibleCoordinates).length !== dimensions) {
    return false;
  } else {
    var x = possibleCoordinates.x;
    var y = possibleCoordinates.y;
    var z = possibleCoordinates.z;
    var w = possibleCoordinates.w;

    if (typeof x !== 'number' || typeof y !== 'number') { return false; }
    if (dimensions > 2 && typeof z !== 'number') { return false; }
    if (dimensions > 3 && typeof w !== 'number') { return false; }
  }

  return true;
}