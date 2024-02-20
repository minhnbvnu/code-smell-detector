function testEntitySelection (t, spec) {
  // TODO: use a more minimal fixture
  let { app } = setupTestApp(t, { archiveId: 'kitchen-sink' })
  let editor = openManuscriptEditor(app)
  const getFirstItem = () => editor.find(spec.itemSelector)

  t.notNil(getFirstItem(), 'there should be at least one item')
  getFirstItem().el.click()
  t.ok(getFirstItem().hasClass('sm-selected'), 'first item must be visually selected')
  t.equal(getSelection(editor).type, 'custom', 'selection must be of custom type')
  setSelection(editor, 'p-2.content', 0)
  t.notOk(getFirstItem().hasClass('sm-selected'), 'visual selection most be gone')
  t.notEqual(getSelection(editor).type, 'custom', 'selection must be of different type')
  t.end()
}