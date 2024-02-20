function writeDocsFile(docsFileObj) {
  return fsp.writeFile(docsPath, JSON.stringify(docsFileObj))
}