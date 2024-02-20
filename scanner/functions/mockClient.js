function mockClient() {
    return {
      db: sinon.stub().returns({ the: "db" }),
      close: "theCloseFnFromMongoClient"
    };
  }