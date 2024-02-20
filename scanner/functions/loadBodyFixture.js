function loadBodyFixture (editor, xml) {
  let editorSession = getEditorSession(editor)
  let els = DefaultDOMElement.parseSnippet(xml, 'xml')
  if (!isArray(els)) els = [els]
  // make sure we only have elements here
  if (isArray(els)) els = els.filter(el => el.isElementNode())
  editorSession.transaction(tx => {
    let body = tx.get('body')
    tx.set(body.getContentPath(), [])
    let importer = createJatsImporter(tx)
    let contentIds = els.map(el => importer.convertElement(el).id)
    tx.set(['body', 'content'], contentIds)
  })
}