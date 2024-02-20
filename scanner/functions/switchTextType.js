function switchTextType (editor, type) {
  return openMenuAndFindTool(editor, 'text-types', `.sm-switch-to-${type}`).el.click()
}