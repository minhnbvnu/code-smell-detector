function reportPath(data) {
  const symbol = head(data.symbol);

  return valueReportPath(symbol.id);
}