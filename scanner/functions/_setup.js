function _setup (t, bodyFixture) {
  let { app } = setupTestApp(t, { archiveId: 'blank' })
  let editor = openManuscriptEditor(app)
  loadBodyFixture(editor, bodyFixture)
  return { editor }
}