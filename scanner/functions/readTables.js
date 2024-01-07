function readTables(file, numTables) {
        const tables = Object.create(null);
        tables["OS/2"] = null;
        tables.cmap = null;
        tables.head = null;
        tables.hhea = null;
        tables.hmtx = null;
        tables.maxp = null;
        tables.name = null;
        tables.post = null;

        for (let i = 0; i < numTables; i++) {
          const table = readTableEntry(file);

          if (!VALID_TABLES.includes(table.tag)) {
            continue;
          }

          if (table.length === 0) {
            continue;
          }

          tables[table.tag] = table;
        }

        return tables;
      }