function _moveFieldUp (editor) {
  let tool = openMenuAndFindTool(editor, 'context-tools', moveUpMetadataFieldToolSelector)
  return tool.el.click()
}