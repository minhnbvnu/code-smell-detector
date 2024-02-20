async function synthesizeCoverage () {
  const [lambdas, devPortal] = await Promise.all([
    readFile(path.resolve('lambdas/coverage/clover.xml')).then(bufferToCoverageObject),
    readFile(path.resolve('dev-portal/coverage/clover.xml')).then(bufferToCoverageObject)
  ])
  const overall = {}

  Object.keys(lambdas).forEach((key) => {
    overall[key] = parseInt(lambdas[key], 10) + parseInt(devPortal[key], 10)
  })

  return { lambdas, devPortal, overall }
}