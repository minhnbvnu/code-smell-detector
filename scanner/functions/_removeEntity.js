function _removeEntity (editor, entityName) {
  let collectionTool = openContextMenuAndFindTool(editor, `.sm-remove-entity`)
  collectionTool.click()
}