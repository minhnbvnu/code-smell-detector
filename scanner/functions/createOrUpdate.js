function createOrUpdate(z, x, y, tileCoord) {
  if (tileCoord !== undefined) {
    tileCoord[0] = z;
    tileCoord[1] = x;
    tileCoord[2] = y;
    return tileCoord;
  }
  return [z, x, y];
}