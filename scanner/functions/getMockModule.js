function getMockModule() {
    const PrismaClient = function () {
      this._engine = { datamodel: {}, datasourceOverrides: {} }
    }

    PrismaClient.prototype._executeRequest = sandbox.stub().resolves()

    return PrismaClient
  }