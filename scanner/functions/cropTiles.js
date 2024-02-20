function cropTiles() {
  tileWidth = width / tileCountY;
  tileHeight = height / tileCountX;
  imgTiles = [];

  for (var gridY = 0; gridY < tileCountY; gridY++) {
    for (var gridX = 0; gridX < tileCountX; gridX++) {
      if (randomMode) {
        cropX = int(random(mouseX - tileWidth / 2, mouseX + tileWidth / 2));
        cropY = int(random(mouseY - tileHeight / 2, mouseY + tileHeight / 2));
      }
      cropX = constrain(cropX, 0, width - tileWidth);
      cropY = constrain(cropY, 0, height - tileHeight);
      imgTiles.push(img.get(cropX, cropY, tileWidth, tileHeight));
    }
  }
}