function mockChangelogCollection() {
    return {
      insertOne: sinon.stub().returns(Promise.resolve())
    };
  }