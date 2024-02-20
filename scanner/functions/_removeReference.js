function _removeReference (editor) {
  let tool = openContextMenuAndFindTool(editor, removeToolSelector)
  return tool.el.click()
}