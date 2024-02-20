function convertToObjectRow(arrayRow, headers) {
    if (!arrayRow) {
      throw new Error("null row");
    }
    if (!headers) {
      throw new Error("no headers");
    }
    const objectRow = {};
    for (let i = 0; i < headers.length; i++) {
      objectRow[headers[i]] = arrayRow[i];
    }
    return objectRow;
  }