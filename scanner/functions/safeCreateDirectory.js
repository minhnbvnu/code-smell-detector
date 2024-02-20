function safeCreateDirectory(filePath) {
  if (existsSync(filePath)) {
    return
  }
  mkdirSync(filePath)
}