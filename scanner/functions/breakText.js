function breakText (editor) {
  let editorSession = editor.context.editorSession
  editorSession.transaction(tx => {
    tx.break()
  })
}