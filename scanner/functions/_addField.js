function _addField (editor) {
  let tool = openContextMenuAndFindTool(editor, addMetadataFieldToolSelector)
  return tool.el.click()
}