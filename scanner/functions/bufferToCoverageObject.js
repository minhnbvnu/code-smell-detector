function bufferToCoverageObject (fileBodyBuffer) {
  const lambdaCoverage = JSON.parse(convert.xml2json(fileBodyBuffer.toString(), { compact: true }))
  const result = {}

  Object.keys(lambdaCoverage.coverage.project.metrics._attributes).forEach((key) => {
    result[key] = parseInt(lambdaCoverage.coverage.project.metrics._attributes[key], 10)
  })

  return result
}