function openMenu (editor, menuName) {
  let menu = editor.find(`.sc-tool-dropdown.sm-${menuName}`)
  let toggle = menu.refs.toggle
  if (!toggle.hasClass('sm-active')) {
    toggle.el.click()
  }
  return menu
}