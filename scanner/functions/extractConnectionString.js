function extractConnectionString(datasource = {}) {
  return process.env[datasource?.url?.fromEnvVar] || datasource?.url?.value
}