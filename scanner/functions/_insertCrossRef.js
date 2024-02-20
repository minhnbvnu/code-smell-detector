function _insertCrossRef (editor, refType, rid) {
  let tool = openMenuAndFindTool(editor, 'insert', `.sm-insert-xref-${refType}`)
  tool.click()
  // an empty xref should have been inserted
  // click on the target option with the given node id
  editor.find(`.sc-edit-xref-tool > .se-option > *[data-id=${rid}]`).click()
}