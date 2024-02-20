function instance(name) {
  if (instancePool[name] === undefined) {
    instancePool[name] = new PouchDB(name, { auto_compaction: true });
  }

  return instancePool[name];
}