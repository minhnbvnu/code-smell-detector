function insertText (editor, text) {
  let editorSession = editor.context.editorSession
  editorSession.transaction(tx => {
    tx.insertText(text)
  })
}