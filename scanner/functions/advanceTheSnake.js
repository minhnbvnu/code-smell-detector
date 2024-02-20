function advanceTheSnake() {
  // Move each snake segment to the location of the one in front of it,
  // starting at the tail until we reach the head.
  for (var i = snake.length - 1; i > 0; i--) {
    snake[i] = Object.assign({}, snake[i-1]);
  }

  // Move the head of the snake, based on the last user direction command.
  if (lastUserDirectionCommand === 'left' && snakeVector !== 'right') {
    snake[0].x--;
    snakeVector = 'left';
  } else
  if (lastUserDirectionCommand === 'right' && snakeVector !== 'left') {
    snake[0].x++;
    snakeVector = 'right';
  } else
  if (lastUserDirectionCommand === 'up' && snakeVector !== 'down') {
    snake[0].y--;
    snakeVector = 'up';
  } else
  if (lastUserDirectionCommand === 'down' && snakeVector !== 'up') {
    snake[0].y++;
    snakeVector = 'down';
  } else {
    // If the code reached here, a person tried to steer the snake in the
    // opposite direction of it's current trajectory. When this happens, we just
    // ignore the user's command and keep the snake moving along the current vector.
    switch (snakeVector) {
      case 'left':
        snake[0].x--
        break;
      case 'right':
        snake[0].x++
        break;
      case 'up':
        snake[0].y--
        break;
      case 'down':
        snake[0].y++
        break;
    }
  }
}