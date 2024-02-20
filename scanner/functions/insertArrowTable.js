async function insertArrowTable(database, name, table, options) {
  const connection = await database.connect();
  try {
    await connection.insertArrowTable(table, {
      name,
      schema: "main",
      ...options
    });
  } finally {
    await connection.close();
  }
}