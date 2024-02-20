function deduceSchema(row, headerRow) {
    const schema = headerRow ? {} : [];
    for (let i = 0; i < row.length; i++) {
      const columnName = headerRow && headerRow[i] || i;
      const value = row[i];
      switch (typeof value) {
        case "number":
        case "boolean":
          schema[columnName] = { name: String(columnName), index: i, type: Float32Array };
          break;
        case "string":
        default:
          schema[columnName] = { name: String(columnName), index: i, type: Array };
      }
    }
    return schema;
  }