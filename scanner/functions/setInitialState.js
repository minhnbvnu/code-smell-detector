function setInitialState() {
  lastUserDirectionCommand = '';
  snakeVector = 'right'; // possible: 'right' 'left' 'up' or 'down'
  snake = [{ x:14, y:7 }, { x:13, y:7 }, { x:12, y:7 }];
  apple = { x:24, y:7 };
  gameMap = cbl.getEmptyMatrix();
  intervalId;
}