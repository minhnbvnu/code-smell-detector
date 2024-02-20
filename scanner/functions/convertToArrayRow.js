function convertToArrayRow(objectRow, headers) {
    if (!objectRow) {
      throw new Error("null row");
    }
    if (!headers) {
      throw new Error("no headers");
    }
    const arrayRow = new Array(headers.length);
    for (let i = 0; i < headers.length; i++) {
      arrayRow[i] = objectRow[headers[i]];
    }
    return arrayRow;
  }