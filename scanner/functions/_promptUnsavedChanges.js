function _promptUnsavedChanges (event, editorWindow) {
  let choice = dialog.showMessageBox(
    editorWindow,
    {
      type: 'question',
      title: 'Unsaved changes',
      message: 'Document has changes, do you want to save them?',
      buttons: ["Don't save", 'Cancel', 'Save'],
      defaultId: 2,
      cancelId: 1
    }
  )
  if (choice === 1) {
    // stop quitting
    event.preventDefault()
    event.returnValue = false
  } else if (choice === 2) {
    // TODO: saving the archive takes a but of time
    // thus we need to prevent closing here too
    // But we should try closing again after archive has been saved
    event.preventDefault()
    event.returnValue = false
    let windowId = editorWindow.id
    ipcMain.once(`save:finished:${windowId}`, () => {
      // console.log('closing window', windowId)
      editorWindow.close()
    })
    editorWindow.webContents.send('save')
  }
}