function cpp14Literal(stream) {
    stream.eatWhile(/[\w\.']/);
    return "number";
  }