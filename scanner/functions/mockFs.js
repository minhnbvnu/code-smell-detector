function mockFs() {
    return {
      stat: sinon.stub(),
      readdir: sinon.stub(),
      readFile: sinon.stub()
    };
  }