function repositionApple() {
  let newAppleX;
  let newAppleY;
  let isOverlappingSnake;

  // A loop to prevent our new apple position from overlapping the snake.
  do {
    if (newAppleX) {
      console.log('overlap prevented');
    }

    newAppleX = Math.floor(Math.random() * width);
    newAppleY = Math.floor(Math.random() * height);
    isOverlappingSnake = snake.some((currentSnakeSegment, index) => {
      return (currentSnakeSegment.x === newAppleX && currentSnakeSegment.y === newAppleY);
    });
  } while (isOverlappingSnake);

  apple.x = newAppleX;
  apple.y = newAppleY;
}