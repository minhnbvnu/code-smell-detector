function getTestSecret(secretName) {
  const envVar = process.env[secretName] || ''
  return envVar.trim()
}