function erase(engine, i, j) {
  engine.set(i - 1, j - 1, 0);
  engine.set(i - 1, j, 0);
  engine.set(i - 1, j + 1, 0);
  engine.set(i, j - 1, 0);
  engine.set(i, j, 0);
  engine.set(i, j + 1, 0);
  engine.set(i + 1, j - 1, 0);
  engine.set(i + 1, j, 0);
  engine.set(i + 1, j + 1, 0);
}