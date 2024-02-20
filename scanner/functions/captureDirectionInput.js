function captureDirectionInput(e) {
  const keycode = e.keyCode.toString();
  const validDirection = directionMap[keycode];

  if (validDirection) {
    e.preventDefault();
    lastUserDirectionCommand = validDirection;
  }
}