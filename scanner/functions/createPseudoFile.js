function createPseudoFile (name, type) {
  let blob
  if (platform.inBrowser) {
    blob = new Blob([PSEUDO_FILE_CONTENT], { type })
    blob.name = name
  // FIXME: do something real in NodeJS
  } else {
    blob = { name, type, data: PSEUDO_FILE_CONTENT }
  }
  return blob
}