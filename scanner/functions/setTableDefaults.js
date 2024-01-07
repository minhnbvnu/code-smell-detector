function setTableDefaults(table, allowWildcardSelector) {
  const defaultTypeTable = allowWildcardSelector ? table['*'] : null;

  for (let type in table) {
    let typeTable = table[type];
    if (typeTable === defaultTypeTable) continue;

    if (defaultTypeTable) {
      mergeTable(typeTable, defaultTypeTable);
    }

    if (typeTable.parents) {
      setTableDefaults(typeTable.parents, true);
    }

    for (let key in typeTable.indices) {
      const indexTable = typeTable.indices[key];
      mergeTable(indexTable, typeTable, false);
      if (indexTable.parents) {
        setTableDefaults(indexTable.parents, true);
      }
    }
  }
}