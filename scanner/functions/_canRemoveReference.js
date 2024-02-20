function _canRemoveReference (editor) {
  let tool = openMenuAndFindTool(editor, 'context-tools', removeToolSelector)
  return tool && !tool.attr('disabled')
}