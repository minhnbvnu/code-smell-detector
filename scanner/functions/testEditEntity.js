function testEditEntity (t, spec) {
  // TODO: use a more minimal fixture
  let { app } = setupTestApp(t, { archiveId: 'kitchen-sink' })
  let editor = openManuscriptEditor(app)
  const _getFirstItem = () => editor.find(spec.itemSelector)
  const _canEdit = () => isToolEnabled(editor, 'context-tools', spec.editToolSelector)
  const _edit = () => openMenuAndFindTool(editor, 'context-tools', spec.editToolSelector).click()

  t.notOk(_canEdit(), 'editing should be disabled wihtout selection')
  _getFirstItem().el.click()
  t.ok(_canEdit(), 'edit author should be enabled')
  _edit()

  let modalEditorSession = getModalEditorSession(editor)
  t.notNil(modalEditorSession, 'there should be a modal editor')
  let selState = modalEditorSession.editorState.selectionState
  t.equal(selState.property.name, spec.property, `the first property should be focused`)
  t.end()
}