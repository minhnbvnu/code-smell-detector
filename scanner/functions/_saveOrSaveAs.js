function _saveOrSaveAs (cb) {
  let archive = _app.state.archive
  if (!archive) return
  if (archive.isReadOnly) {
    _saveAs(cb)
  } else {
    _app._save(cb)
  }
}