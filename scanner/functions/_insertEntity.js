function _insertEntity (editor, entityName) {
  // open the corresponding dropdown
  let menu = editor.find('.sc-tool-dropdown.sm-insert')
  menu.find('button').el.click()
  let addButton = menu.find(`.sc-tool.sm-add-${entityName}`).el
  return addButton.click()
}