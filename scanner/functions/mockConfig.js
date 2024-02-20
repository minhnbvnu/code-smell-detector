function mockConfig() {
    return {
      read: sinon.stub().returns({
        migrationsDir: "migrations",
        migrationFileExtension: ".js"
      })
    };
  }