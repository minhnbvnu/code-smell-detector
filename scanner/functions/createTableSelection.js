function createTableSelection (tableId, data, surfaceId) {
  if (!data.anchorCellId || !data.focusCellId) throw new Error('Invalid selection data')
  return {
    type: 'custom',
    customType: 'table',
    nodeId: tableId,
    data: data,
    surfaceId
  }
}