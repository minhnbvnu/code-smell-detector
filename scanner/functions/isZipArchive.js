function isZipArchive(codeUri) {
  return codeUri ? codeUri.endsWith('.zip') || codeUri.endsWith('.jar') || codeUri.endsWith('.war') : false;
}