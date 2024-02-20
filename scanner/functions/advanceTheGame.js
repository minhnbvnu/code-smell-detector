function advanceTheGame() {
  let tailSegmentCopy = Object.assign({}, snake[snake.length - 1]);

  // Advance the Snake
  advanceTheSnake();

  // Check for Snake Collision
  if (isSnakeCollision()) {
    gameOver();
    return;
  }

  if (isSnakeEatingApple()) {
    snake.push(tailSegmentCopy);
    repositionApple();
  }

  redrawGameMap();
}