function getAmount(row) {
  return parseFloat(row[COLUMN.AMOUNT].replace(',', '.'));
}