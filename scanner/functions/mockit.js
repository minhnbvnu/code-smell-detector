function mockit(description, run) {
  return it(description, withMock(run));
}