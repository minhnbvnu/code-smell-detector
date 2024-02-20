function createTestApp (options = {}) {
  const validateOnSave = !options.noValidationOnSave

  class App extends TextureWebApp {
    _getStorage () {
      let _vfs = options.vfs || vfs
      // TODO: find out if we still need options.root, because it looks like
      // we are using options.rootDir
      // HACK: hard-coding the data location for different test-scenarios
      // 1. when running nodejs tests, then the data is in '../data'
      // 2. when running tests in electron, the data is in '../../data'
      let _rootFolder = options.root || options.rootDir
      if (!_rootFolder) {
        if (platform.inElectron) {
          _rootFolder = '../../data/'
        } else {
          _rootFolder = '../data/'
        }
      }
      return new VfsStorageClient(_vfs, _rootFolder, options)
    }

    willUpdateState (newState) {
      if (newState.archive) {
        this.emit('archive:ready', newState.archive)
      } else if (newState.error) {
        this.emit('archive:failed', newState.error)
      }
    }

    _save (cb) {
      return super._save((err, rawArchiveUpdate) => {
        if (validateOnSave) {
          if (!err && rawArchiveUpdate) {
            let changedResourceNames = Object.keys(rawArchiveUpdate.resources)
            for (let resourceName of changedResourceNames) {
              if (!resourceName.endsWith('.xml')) continue
              let xmlStr = rawArchiveUpdate.resources[resourceName].data
              let xmlDom = DefaultDOMElement.parseXML(xmlStr)
              let doctype = xmlDom.getDoctype()
              if (doctype && /JATS/.exec(doctype.publicId)) {
                let result = validateXML(TextureJATS, xmlDom)
                if (!result.ok) {
                  console.error('Texture generated invalid JATS:' + result.errors)
                  throw new Error('Texture generated invalid JATS')
                }
              }
            }
          }
        }
        cb(err, rawArchiveUpdate)
      })
    }
  }
  return App
}