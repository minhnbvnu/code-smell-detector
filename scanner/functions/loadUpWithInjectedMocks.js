function loadUpWithInjectedMocks() {
    return proxyquire("../../lib/actions/up", {
      "./status": status,
      "../env/config": config,
      "../env/migrationsDir": migrationsDir
    });
  }