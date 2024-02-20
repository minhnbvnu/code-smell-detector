function setupTestApp (t, options = {}) {
  // TODO: this is a little weird. Maybe just pass App as
  let el = getMountPoint(t)
  let archiveId = options.archiveId || 'kitchen-sink'
  // this creates a customized TextureWebApp that uses a VfsStorageClient
  // for options.vfs (if provided)
  let App = createTestApp(options)
  // TODO: use options here
  let app = App.mount({
    debug: true,
    archiveId
  }, el)
  // ATTENTION: in the test suite everything works synchronously
  // even despite the API beyond asynchronous
  if (app.state.error) {
    throw new Error(app.state.error)
  } else {
    let archive = app.state.archive
    let manifest = archive.getDocument('manifest')
    let manuscript = archive.getDocument('manuscript')
    let editor = openManuscriptEditor(app)
    return { app, archive, manifest, manuscript, editor }
  }
}