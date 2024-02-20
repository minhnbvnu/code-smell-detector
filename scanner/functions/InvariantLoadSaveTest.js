function InvariantLoadSaveTest (archiveId, memory) {
  const _test = (title, fn) => test(`${title}${memory ? ' (memory)' : ''}`, t => {
    if (memory) {
      DefaultDOMElement._forceMemoryDOM = true
      delete t.sandbox
    }
    t._document = DefaultDOMElement.createDocument('html')
    try {
      fn(t)
    } finally {
      DefaultDOMElement._forceMemoryDOM = false
    }
  })

  _test(`Persistence: loading and saving article ${archiveId}`, t => {
    // create a vfs where we can store the data during save without harming the global vfs instance
    let testVfs = setupTestVfs(vfs, archiveId)
    let { app, archive, manuscript } = setupTestApp(t, {
      vfs: testVfs,
      writable: true,
      archiveId
    })

    let originalRawArchive
    archive.storage.read(archiveId, (err, rawArchive) => {
      if (err) throw new Error(err)
      originalRawArchive = rawArchive
    })

    // trigger a save
    _NOP({ manuscript })

    // Note: with VFS these calls are actually not asynchronous, i.e. calling back instantly
    app._save(err => {
      if (err) throw new Error(err)
    })

    // get the updated raw archive
    let newRawArchive
    archive.storage.read(archiveId, (err, rawArchive) => {
      if (err) throw new Error(err)
      newRawArchive = rawArchive
    })

    let originalManuscriptXML = toUnix(originalRawArchive.resources['manuscript.xml'].data)
    let newManuscriptXML = toUnix(newRawArchive.resources['manuscript.xml'].data)

    // check the new archive for validator errors
    let err = checkArchive(TextureArchive, newRawArchive)
    let details = err ? err.detail : null
    t.nil(details, 'There should be no error.')

    if (newManuscriptXML !== originalManuscriptXML) {
      // we are not using the built-in equal assertion
      // because the error message is not helpful
      // instead we fail with a general message and an extra that
      // will be displayed in the browser
      let msg = 'XML should not have changed'
      if (platform.inBrowser) {
        t._assert(false, {
          message: msg,
          operator: 'equal',
          actual: newManuscriptXML,
          expected: originalManuscriptXML
        })
      } else {
        t.fail(msg)
        console.log('Diff:')
        console.log(diff(newManuscriptXML, originalManuscriptXML))
      }
    } else {
      t.pass('XML did not change')
    }

    // finally try to let the app load the new archive
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