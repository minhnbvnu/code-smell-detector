function eatSpace() {
  while (peek() === spaceChr) {
    next();
  }
}