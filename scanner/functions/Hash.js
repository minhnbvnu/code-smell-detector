function hash(tileCoord) {
  return (tileCoord[1] << tileCoord[0]) + tileCoord[2];
}