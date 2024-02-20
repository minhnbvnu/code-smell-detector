function createMockSound() {
  return {
    load: sinon.stub(),
    play: sinon.stub(),
    destruct: sinon.stub(),
  };
}