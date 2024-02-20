function generateTable (doc, nrows, ncols, tableId) {
  return documentHelpers.createNodeFromJson(doc, Table.getTemplate({
    id: tableId,
    headerRows: 1,
    rows: nrows,
    cols: ncols
  }))
}