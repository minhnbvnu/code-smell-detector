function _addCustomAbstract (metadataEditor) {
  // open the add drop down and click the according insert button
  let addDropDown = metadataEditor.find('.sc-tool-dropdown.sm-insert')
  addDropDown.find('button').click()
  addDropDown.find('.sc-tool.sm-add-custom-abstract').click()
}