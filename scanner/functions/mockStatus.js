function mockStatus() {
    return sinon.stub().returns(
      Promise.resolve([
        {
          fileName: "20160605123224-first_applied_migration.js",
          appliedAt: new Date()
        },
        {
          fileName: "20160606093207-second_applied_migration.js",
          appliedAt: new Date()
        },
        {
          fileName: "20160607173840-first_pending_migration.js",
          appliedAt: "PENDING"
        },
        {
          fileName: "20160608060209-second_pending_migration.js",
          appliedAt: "PENDING"
        }
      ])
    );
  }