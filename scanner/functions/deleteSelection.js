function deleteSelection (editor) {
  let editorSession = editor.context.editorSession
  editorSession.transaction((tx) => {
    tx.deleteSelection()
  })
}