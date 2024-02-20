function _removeFigurePanel (editor) {
  let tool = openContextMenuAndFindTool(editor, removePanelToolSelector)
  return tool.click()
}