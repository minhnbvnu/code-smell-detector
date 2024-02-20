function safeReadConfig(filePath) {
  if (!existsSync(filePath)) {
    return {}
  }
  const configJson = readFileSync(CONFIG_FILE, 'utf-8')
  return JSON.parse(configJson)
}