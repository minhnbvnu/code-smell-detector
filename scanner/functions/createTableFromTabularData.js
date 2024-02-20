function createTableFromTabularData (doc, data, tableId) {
  return documentHelpers.createNodeFromJson(doc, {
    id: tableId,
    type: 'table',
    rows: data.map(rowData => {
      return {
        type: 'table-row',
        cells: rowData.map(cellValue => {
          return {
            type: 'table-cell',
            content: String(cellValue)
          }
        })
      }
    })
  })
}