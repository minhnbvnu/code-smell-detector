async function createDuckDB() {
  if (promise === undefined) promise = loadDuckDB();
  const {module, bundle, logger} = await promise;
  const worker = await module.createWorker(bundle.mainWorker);
  const db = new module.AsyncDuckDB(logger, worker);
  await db.instantiate(bundle.mainModule);
  return db;
}