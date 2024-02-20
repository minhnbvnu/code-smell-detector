function redrawGameMap() {
  // clear the existing map
  gameMap = cbl.getEmptyMatrix();

  // Draw the snake and apple on the map as-is.
  gameMap[apple.y][apple.x] = 2;

  snake.forEach(snakeSegment => {
    gameMap[snakeSegment.y][snakeSegment.x] = 1
  });

  cbl.setData(gameMap);
}