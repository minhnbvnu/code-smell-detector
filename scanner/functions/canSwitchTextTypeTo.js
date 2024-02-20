function canSwitchTextTypeTo (editor, type) {
  let tool = openMenuAndFindTool(editor, 'text-types', `.sm-switch-to-${type}`)
  return tool && !tool.attr('disabled')
}