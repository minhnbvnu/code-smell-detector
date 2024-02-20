function _testInsertXref (t, path, refTool, refType, rid, label) {
  let { app } = setupTestApp(t, fixture('cross-references'))
  let editor = openManuscriptEditor(app)
  let doc = getDocument(editor)
  setSelection(editor, path, 1)
  _insertCrossRef(editor, refTool, rid)
  let annos = doc.getAnnotations(path)
  let xref = annos[0]
  if (xref) {
    let actual = {
      type: xref.type,
      refType: xref.refType,
      refTargets: xref.refTargets
    }
    let expected = {
      type: 'xref',
      refType,
      refTargets: rid.split(' ')
    }
    t.deepEqual(actual, expected, 'a xref should have been created')
    t.equal(getLabel(xref), label, 'label should be correct')
  } else {
    t.fail('xref has not been created')
  }
  t.end()
}