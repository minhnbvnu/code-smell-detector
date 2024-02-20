async function insertArray(database, name, array, options) {
  const arrow = await loadArrow();
  const table = arrow.tableFromJSON(array);
  return await insertArrowTable(database, name, table, options);
}