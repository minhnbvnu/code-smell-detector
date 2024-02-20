function initTiles() {
  for (var gridX = 0; gridX < gridResolutionX; gridX++) {
    tiles[gridX] = [];
    tileColors[gridX] = [];
    tileType[gridX] = [];
    for (var gridY = 0; gridY < gridResolutionY; gridY++) {
      tiles[gridX][gridY] = 0;
      tileColors[gridX][gridY] = color(random(360), 0, random(100));
    }
  }
}