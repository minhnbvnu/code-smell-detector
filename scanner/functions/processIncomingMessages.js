function processIncomingMessages() {
    nodes.forEach(function(pos) {
      pos.x = (pos.incX + pos.x)/(pos.incLength + 1);
      pos.y = (pos.incY + pos.y)/(pos.incLength + 1);
      pos.incLength = 0;
      pos.incX = 0;
      pos.incY = 0;
    });
  }