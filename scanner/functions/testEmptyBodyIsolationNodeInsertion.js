function testEmptyBodyIsolationNodeInsertion (t, spec) {
  // TODO: the tests/checks could be more targeted. We should not check for everything everywhere.
  // A test should focus on a certain aspect and test only that.
  let { app } = setupTestApp(t, { archiveId: 'blank' })
  let editor = openManuscriptEditor(app)
  let doc = getDocument(editor)

  const _canInsert = () => isToolEnabled(editor, 'insert', spec.tool)
  const _insert = () => openMenuAndFindTool(editor, 'insert', spec.tool).click()
  const _getFirstElement = () => doc.get('body').getNodeAt(0)

  loadBodyFixture(editor, EMPTY_P)

  t.notOk(_canInsert(), 'insert should be disabled wihtout selection')
  setCursor(editor, 'p1.content', 0)
  t.ok(_canInsert(), 'insert should be enabled')
  _insert()
  t.equal(_getFirstElement().type, spec.type, 'element should be ' + spec.type)
  doesNotThrowInNodejs(t, () => {
    clickUndo(editor)
  }, 'undoing should not throw')
  t.end()
}