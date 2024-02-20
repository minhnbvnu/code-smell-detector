function _getCurrentXpath (editor) {
  const selectionState = getSelectionState(editor)
  return selectionState.xpath
}