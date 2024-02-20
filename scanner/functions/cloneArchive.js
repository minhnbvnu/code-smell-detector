async function cloneArchive (archiveDir, newArchiveDir, opts = {}) {
  // make sure that the given path is a dar
  if (await isDocumentArchive(archiveDir, opts)) {
    await fsExtra.copy(archiveDir, newArchiveDir)
    return true
  } else {
    throw new Error(archiveDir + ' is not a valid document archive.')
  }
}