function getModalEditorSession (editor) {
  let modal = editor.find('.sc-modal-dialog .se-body > .se-content')
  if (modal) {
    return modal.context.editorSession
  }
}