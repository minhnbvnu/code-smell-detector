function _readRawArchive (fs, archiveId, baseUrl = '') {
  let manifestXML = fs.readFileSync(`${archiveId}/manifest.xml`)
  let manifest = ManifestLoader.load(manifestXML)
  let docs = manifest.getDocumentNodes()
  let assets = manifest.getAssetNodes()
  let rawArchive = {
    version: '0',
    resources: {
      'manifest.xml': {
        encoding: 'utf8',
        data: manifestXML
      }
    }
  }

  docs.forEach(entry => {
    let path = entry.path
    if (fs.existsSync(`${archiveId}/${entry.path}`)) {
      let content = fs.readFileSync(`${archiveId}/${entry.path}`)
      rawArchive.resources[path] = {
        encoding: 'utf8',
        data: content
      }
    } else {
      console.warn(`${archiveId}/${entry.path} not found in vfs`)
    }
  })
  assets.forEach(asset => {
    let path = asset.path
    // TODO: we could store other stats and maybe mime-types in VFS
    rawArchive.resources[path] = {
      encoding: 'url',
      data: baseUrl + archiveId + '/' + path
    }
  })
  return rawArchive
}