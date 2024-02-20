function mockDb() {
    const mock = {};
    mock.collection = sinon.stub();
    mock.collection.withArgs("changelog").returns(changelogCollection);
    return mock;
  }