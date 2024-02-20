function _selectFigurePanel (editor, figure, panelIndex) {
  let editorSession = getEditorSession(editor)
  editorSession.updateNodeStates([[figure.id, { currentPanelIndex: panelIndex }]])
  selectNode(editor, figure.id)
}