function exportNode (node) {
  let jats = createEmptyJATS()
  let exporter = createJatsExporter(jats, node.getDocument())
  return exporter.convertNode(node)
}