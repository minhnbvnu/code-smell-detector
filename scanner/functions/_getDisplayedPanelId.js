function _getDisplayedPanelId (editor) {
  return editor.find(currentPanelSelector).getAttribute('data-id')
}