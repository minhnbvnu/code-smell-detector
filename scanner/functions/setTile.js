function setTile() {
  // convert mouse position to grid coordinates
  var gridX = floor(mouseX / tileSize) + 1;
  gridX = constrain(gridX, 1, gridResolutionX - 2);
  var gridY = floor(mouseY / tileSize) + 1;
  gridY = constrain(gridY, 1, gridResolutionY - 2);
  tiles[gridX][gridY] = 1;
  tileColors[gridX][gridY] = activeTileColor;
  if (randomMode) {
    tileType[gridX][gridY] = moduleType[int(random(moduleType.length))];
  } else {
    tileType[gridX][gridY] = activeModuleSet;
  }
}