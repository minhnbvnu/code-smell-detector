async function insertFile(database, name, file, options) {
  const url = await file.url();
  if (url.startsWith("blob:")) {
    const buffer = await file.arrayBuffer();
    await database.registerFileBuffer(file.name, new Uint8Array(buffer));
  } else {
    await database.registerFileURL(file.name, new URL(url, location).href, 4); // duckdb.DuckDBDataProtocol.HTTP
  }
  const connection = await database.connect();
  try {
    switch (file.mimeType) {
      case "text/csv":
      case "text/tab-separated-values": {
        return await connection.insertCSVFromPath(file.name, {
          name,
          schema: "main",
          ...options
        }).catch(async (error) => {
          // If initial attempt to insert CSV resulted in a conversion
          // error, try again, this time treating all columns as strings.
          if (error.toString().includes("Could not convert")) {
            return await insertUntypedCSV(connection, file, name);
          }
          throw error;
        });
      }
      case "application/json":
        return await connection.insertJSONFromPath(file.name, {
          name,
          schema: "main",
          ...options
        });
      default:
        if (/\.arrow$/i.test(file.name)) {
          const buffer = new Uint8Array(await file.arrayBuffer());
          return await connection.insertArrowFromIPCStream(buffer, {
            name,
            schema: "main",
            ...options
          });
        }
        if (/\.parquet$/i.test(file.name)) {
          return await connection.query(
            `CREATE VIEW '${name}' AS SELECT * FROM parquet_scan('${file.name}')`
          );
        }
        throw new Error(`unknown file type: ${file.mimeType}`);
    }
  } finally {
    await connection.close();
  }
}