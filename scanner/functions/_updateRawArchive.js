function _updateRawArchive (fs, archiveId, rawArchive, baseUrl = '') {
  let paths = Object.keys(rawArchive.resources)
  for (let path of paths) {
    let resource = rawArchive.resources[path]
    let data = resource.data
    fs.writeFileSync(`${archiveId}/${path}`, data)
  }
}