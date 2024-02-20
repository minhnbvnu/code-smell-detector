function _canMoveFieldUp (editor) {
  let tool = openMenuAndFindTool(editor, 'context-tools', moveUpMetadataFieldToolSelector)
  return tool && !tool.attr('disabled')
}