function _exportTable (table) {
  let jats = createEmptyJATS()
  let exporter = createJatsExporter(jats, table.getDocument())
  return exporter.convertNode(table)
}