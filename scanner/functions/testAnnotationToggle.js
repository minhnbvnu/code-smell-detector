function testAnnotationToggle (t, spec) {
  let { app, editor } = _setup(t, FIXTURE)
  const _hasAnno = () => {
    return Boolean(editor.find(`[data-path="p1.content"] ${spec.selector}`))
  }
  // Set the cursor and check if tool is active
  setCursor(editor, 'p1.content', 3)
  t.notOk(_isToolEnabled(editor, spec), 'tool should be disabled')
  // Set the selection and check if tool is active
  setSelection(editor, 'p1.content', 2, 4)
  t.ok(_isToolEnabled(editor, spec), 'tool should be enabled')
  // Toggle the annotation
  _toggleAnnotation(t, editor, spec)
  t.ok(_hasAnno(), 'there should be an annotation')
  ensureValidJATS(t, app)

  // then toggle the annotation again to remove it
  t.ok(_isToolEnabled(editor, spec), 'tool should be enabled')
  _toggleAnnotation(t, editor, spec)
  t.notOk(_hasAnno(), 'There should be no annotation')
  t.end()
}