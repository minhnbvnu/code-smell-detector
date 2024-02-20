function sanitizeFilePath (filePath) {
  return filePath.replace(/^\/+/, '')
}