function exceljs(contents) {
  const workbook = new ExcelJS.Workbook();
  for (const [sheet, rows] of Object.entries(contents)) {
    const ws = workbook.addWorksheet(sheet);
    for (const row of rows) ws.addRow(row);
  }
  return workbook;
}