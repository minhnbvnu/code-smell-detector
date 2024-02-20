function LoadSaveShouldNotThrow (archiveId, title, change) {
  test(`Persistence: ${title}`, t => {
    // create a vfs where we can store the data during save without harming the global vfs instance
    let testVfs = setupTestVfs(vfs, archiveId)
    let { app, archive, manuscript } = setupTestApp(t, {
      vfs: testVfs,
      writeable: true,
      archiveId
    })
    // change the content
    change({ app, archive, manuscript })
    // trigger a save
    // Note: with VFS these calls are actually not asynchronous, i.e. calling back instantly
    app._save(err => {
      if (err) throw new Error(err)
    })
    // let the app load the new archive
    getMountPoint(t).empty()
    t.doesNotThrow(() => {
      setupTestApp(t, {
        vfs: testVfs,
        archiveId
      })
    }, 'The persisted file should be loaded and rendered without problems')
    t.end()
  })
}