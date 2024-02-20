function _exportBody (body) {
  let jats = createEmptyJATS()
  let exporter = createJatsExporter(jats, body.getDocument())
  return exporter.convertNode(body)
}