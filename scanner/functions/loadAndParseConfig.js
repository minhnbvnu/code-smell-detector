function loadAndParseConfig(filePath) {
  if (typeof filePath === 'object') {
    return filePath
  }

  try {
    return fs.existsSync(filePath)
      ? JSON.parse(removeJsComments(fs.readFileSync(filePath, 'utf-8')))
      : {}
  } catch (ex) {
    console.error('Error opening config file ' + filePath)
    console.error(ex)
    process.exit(1)
  }
}