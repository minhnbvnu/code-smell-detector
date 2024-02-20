function readBracket(stream) {
    var level = 0;
    while (stream.eat("=")) ++level;
    stream.eat("[");
    return level;
  }