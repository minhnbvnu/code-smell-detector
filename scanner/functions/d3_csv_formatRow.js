function d3_csv_formatRow(row) {
  return row.map(d3_csv_formatValue).join(",");
}