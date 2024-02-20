function mockMongodb() {
    return {
      MongoClient: {
        connect: sinon.stub().returns(Promise.resolve(client))
      }
    };
  }