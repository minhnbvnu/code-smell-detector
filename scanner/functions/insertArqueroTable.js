async function insertArqueroTable(database, name, source) {
  // TODO When we have stdlib versioning and can upgrade Arquero to version 5,
  // we can then call source.toArrow() directly, with insertArrowTable()
  const arrow = await loadArrow();
  const table = arrow.tableFromIPC(source.toArrowBuffer());
  return await insertArrowTable(database, name, table);
}