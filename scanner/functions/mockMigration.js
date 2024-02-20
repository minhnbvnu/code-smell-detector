function mockMigration() {
    const migration = {
      up: sinon.stub()
    };
    migration.up.returns(Promise.resolve());
    return migration;
  }