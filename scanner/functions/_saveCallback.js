function _saveCallback (err) {
  if (err) {
    _handleSaveError(err)
  } else {
    let msg = `save:finished:${_window.id}`
    // console.log(msg)
    ipc.send(msg)
  }
}