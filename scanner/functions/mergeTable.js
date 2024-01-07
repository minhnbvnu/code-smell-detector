function mergeTable(table, defaultTable, mergeIndices = true) {
  if (mergeIndices && defaultTable.indices) {
    if (!table.indices) table.indices = {};
    for (let key in defaultTable.indices) {
      if (!table.indices[key]) table.indices[key] = {};
      mergeTable(table.indices[key], defaultTable.indices[key]);
    }
  }

  if (defaultTable.parents) {
    if (!table.parents) table.parents = {};
    for (let key in defaultTable.parents) {
      if (!table.parents[key]) table.parents[key] = {};
      mergeTable(table.parents[key], defaultTable.parents[key]);
    }
  }

  if (defaultTable.result != null && table.result == null) {
    table.result = defaultTable.result;
  }
}