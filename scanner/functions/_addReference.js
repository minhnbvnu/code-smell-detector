function _addReference (editor, bibrType) {
  let menu = editor.find('.sc-tool-dropdown.sm-insert')
  menu.find('button').el.click()
  menu.find(`.sc-tool.sm-add-reference`).el.click()
  editor.find(`.sc-modal-dialog .sc-add-reference .se-type.sm-${bibrType}`).click()
}