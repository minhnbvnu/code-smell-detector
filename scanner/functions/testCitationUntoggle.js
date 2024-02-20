function testCitationUntoggle (t, xrefType) {
  let { editor } = _setup(t, DOUBLE_CITATIONS)
  const selector = '[data-id="xref-' + xrefType + '"]'

  // Toggle edit citation dialog
  const xref = editor.find(selector)
  const xrefLabelBefore = _getText(editor, selector)
  xref.click()

  // Toggle first citation in list
  const firstXref = editor.find('.sc-edit-xref-tool .se-option.sm-selected .sc-preview')
  // Note: There is no way to detect exception in browser
  firstXref.click()
  const xrefLabelAfter = _getText(editor, selector)

  t.ok(xrefLabelBefore !== xrefLabelAfter, 'Label should change')
  t.notEqual(xrefLabelAfter, '???', 'Label should not disappear')
  t.end()
}