async function loadDataSource(source, mode, name) {
  switch (mode) {
    case "chart": return loadChartDataSource(source);
    case "table": return loadTableDataSource(source, name);
    case "sql": return loadSqlDataSource(source, name);
  }
  return source;
}