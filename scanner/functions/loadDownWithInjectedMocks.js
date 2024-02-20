function loadDownWithInjectedMocks() {
    return proxyquire("../../lib/actions/down", {
      "./status": status,
      "../env/config": config,
      "../env/migrationsDir": migrationsDir
    });
  }