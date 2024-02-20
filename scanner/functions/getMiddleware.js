function getMiddleware(mode) {
  const results = [];
  const log = o => {
    results.push(o);
  };

  return {log: results, dump: new DumpXVIZ({log, mode})};
}