function testLambdas (withCoverage) {
  const params = { stdio: withCoverage ? undefined : 'inherit', shell: true, cwd: path.resolve(__dirname, '../lambdas') }
  const unitString = 'CI=true ' + bin('', 'jest')
  const coverageString = bin('', 'jest') + ' --coverage'
  return augmentChildProcess(spawn(withCoverage ? coverageString : unitString, params), withCoverage)
}