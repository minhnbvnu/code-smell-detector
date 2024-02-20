function isSupportedExtension (file) {
  return extensions[path.extname(file)] || false
}