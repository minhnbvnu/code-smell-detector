function isToolEnabled (editor, menuName, toolSelector) {
  let tool = openMenuAndFindTool(editor, menuName, toolSelector)
  return tool && !tool.getAttribute('disabled')
}