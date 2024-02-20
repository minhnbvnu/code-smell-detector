function isSnakeCollision() {
  const isWallCollision = snake[0].x < 0 || snake[0].y < 0 || snake[0].x > width-1 || snake[0].y > height-1;
  const isSelfCollision = snake.some((currentSnakeSegment, index) => {
    if (index === 0) return;
    return snake[0].x === currentSnakeSegment.x && snake[0].y === currentSnakeSegment.y;
  });

  return isWallCollision || isSelfCollision;
}