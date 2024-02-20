function _INSERT_FIGURE ({ app }) {
  let editor = openManuscriptEditor(app)
  let editorSession = getEditorSession(editor)
  let doc = editorSession.getDocument()
  let p = doc.get('body').getNodeAt(0)
  setSelection(editor, p.getPath(), 0)
  // TODO: more 'transparent' way to create 'files'
  let fe = new PseudoFileEvent()
  editor.send('executeCommand', 'insert-fig', {
    files: fe.currentTarget.files
  })
}