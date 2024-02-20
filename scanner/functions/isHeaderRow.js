function isHeaderRow(row) {
    return row && row.every((value) => typeof value === "string");
  }