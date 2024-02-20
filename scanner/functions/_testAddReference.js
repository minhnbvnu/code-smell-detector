function _testAddReference (t, bibrType) {
  let { editor } = setupTestApp(t, { archiveId: 'blank' })
  doesNotThrowInNodejs(t, () => {
    _addReference(editor, bibrType)
  })
  t.notNil(editor.find(`.sc-card.sm-${bibrType}`), 'there should be a card for the new entitiy')
  t.end()
}