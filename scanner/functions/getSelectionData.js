function getSelectionData (sel) {
  if (sel && sel.customType === 'table') {
    return sel.data
  }
  return {}
}