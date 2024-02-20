async function isDocumentArchive (archiveDir, opts = {}) {
  let path = opts.path || _require('path')
  // assuming it is a DAR if the folder exists and there is a manifest.xml
  return _fileExists(path.join(archiveDir, 'manifest.xml'), opts)
}