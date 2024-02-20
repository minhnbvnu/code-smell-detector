function startEditMetadata (editor) {
  editor.send('startWorkflow', 'edit-metadata-workflow')
  let modalEditor = editor.find('.sc-modal-dialog .se-body > .se-content')
  return modalEditor
}