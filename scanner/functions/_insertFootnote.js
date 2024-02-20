function _insertFootnote (el) {
  const insertDropdown = el.find('.sc-tool-dropdown.sm-insert .sc-button')
  // Check if dropdown is already active
  const isDropDownOpened = insertDropdown.hasClass('sm-active')
  if (!isDropDownOpened) {
    insertDropdown.click()
  }
  let insertFootnoteBtn = el.find('.sc-tool.sm-insert-footnote')
  insertFootnoteBtn.click()
}