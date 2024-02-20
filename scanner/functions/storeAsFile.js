function storeAsFile(code) {
  const filePath = tmpFilePath()

  fs.writeFileSync(filePath, code, 'utf-8')

  return filePath
}