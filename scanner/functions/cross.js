function cross(engine, i, j) {
  engine.set(i - 1, j);
  engine.set(i, j - 1);
  engine.set(i, j);
  engine.set(i, j + 1);
  engine.set(i + 1, j);
}