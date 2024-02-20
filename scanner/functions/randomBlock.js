function randomBlock () {
  return pad((getRandomValue() *
    discreteValues << 0)
    .toString(base), blockSize);
}