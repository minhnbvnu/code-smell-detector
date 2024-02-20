function openMenuAndFindTool (editor, menuName, toolSelector) {
  const menu = editor.find(`.sc-tool-dropdown.sm-${menuName}`)
  if (menu.hasClass('sm-disabled')) return false
  let toggle = menu.refs.toggle
  if (!toggle.hasClass('sm-active')) {
    toggle.el.click()
  }
  return menu.find(toolSelector)
}