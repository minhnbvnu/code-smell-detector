function drawModules() {
  for (var gridX = 1; gridX < gridResolutionX - 1; gridX++) {
    for (var gridY = 1; gridY < gridResolutionY - 1; gridY++) {
      // use only active tiles
      var currentTile = tiles[gridX][gridY];
      if (tiles[gridX][gridY] != 0) {
        var binaryResult = '';
        // check the four neightbours, each can be true or false
        // create a binary result out of it, eg. 1011
        // NORTH
        if (tiles[gridX][gridY - 1] != 0) {
          binaryResult += '1';
        } else {
          binaryResult += '0';
        }
        // WEST
        if (tiles[gridX - 1][gridY] != 0) {
          binaryResult += '1';
        } else {
          binaryResult += '0';
        }
        // SOUTH
        if (tiles[gridX][gridY + 1] != 0) {
          binaryResult += '1';
        } else {
          binaryResult += '0';
        }
        // EAST
        if (tiles[gridX + 1][gridY] != 0) {
          binaryResult += '1';
        } else {
          binaryResult += '0';
        }

        // convert binary string to a decimal values from 0 - 15
        var decimalResult = parseInt(binaryResult, 2);
        var posX = tileSize * gridX - tileSize / 2;
        var posY = tileSize * gridY - tileSize / 2;

        noStroke();
        tint(tileColors[gridX][gridY]);

        // decimalResult is also the index for the shape array
        image(modules[tileType[gridX][gridY]][decimalResult], posX, posY, tileSize, tileSize);

        if (isDebugMode) {
          fill(60);
          text(currentTile + '\n' + decimalResult + '\n' + binaryResult, posX, posY);
        }
      }
    }
  }
}