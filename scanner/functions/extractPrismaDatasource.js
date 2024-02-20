function extractPrismaDatasource(client) {
  const { get_config: getConfig } = require('@prisma/prisma-fmt-wasm')
  const options = JSON.stringify({
    prismaSchema: client?._engine?.datamodel,
    ignoreEnvVarErrors: true
  })
  const config = JSON.parse(getConfig(options))
  const activeDatasource = config?.datasources?.[0]

  return {
    provider: activeDatasource.provider,
    url: extractConnectionString(activeDatasource)
  }
}