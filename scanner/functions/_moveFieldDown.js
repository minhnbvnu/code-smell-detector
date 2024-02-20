function _moveFieldDown (editor) {
  let tool = openMenuAndFindTool(editor, 'context-tools', moveDownMetadataFieldToolSelector)
  return tool.el.click()
}