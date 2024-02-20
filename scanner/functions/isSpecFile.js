function isSpecFile(filename) {
  return filename.includes('/spec/') || filename.endsWith('-spec.js');
}