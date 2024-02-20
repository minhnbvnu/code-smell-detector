async function readArchive (archiveDir, opts = {}) {
  // make sure that the given path is a dar
  if (await isDocumentArchive(archiveDir, opts)) {
    // first get a list of stats
    const entries = await listDir(archiveDir, opts)
    // then get file records as specified TODO:link
    let resources = {}
    for (var i = 0; i < entries.length; i++) {
      let entry = entries[i]
      let record = await _getFileRecord(entry, opts)
      resources[record.path] = record
    }
    return {
      resources,
      version: '0'
    }
  } else {
    throw new Error(archiveDir + ' is not a valid document archive.')
  }
}