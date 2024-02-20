async function loadDuckDB() {
  const module = await import(`${cdn}${duckdb.resolve()}`);
  const bundle = await module.selectBundle({
    mvp: {
      mainModule: `${cdn}${duckdb.resolve("dist/duckdb-mvp.wasm")}`,
      mainWorker: `${cdn}${duckdb.resolve("dist/duckdb-browser-mvp.worker.js")}`
    },
    eh: {
      mainModule: `${cdn}${duckdb.resolve("dist/duckdb-eh.wasm")}`,
      mainWorker: `${cdn}${duckdb.resolve("dist/duckdb-browser-eh.worker.js")}`
    }
  });
  const logger = new module.ConsoleLogger();
  return {module, bundle, logger};
}