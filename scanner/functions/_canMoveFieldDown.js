function _canMoveFieldDown (editor) {
  let tool = openMenuAndFindTool(editor, 'context-tools', moveDownMetadataFieldToolSelector)
  return tool && !tool.attr('disabled')
}