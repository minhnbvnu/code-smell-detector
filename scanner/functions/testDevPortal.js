function testDevPortal (withCoverage) {
  const params = { stdio: withCoverage ? undefined : 'inherit', shell: true, cwd: path.resolve(__dirname, '../dev-portal') }
  const unitString = 'CI=true ' + bin('dev-portal', 'react-scripts') + ' test'
  const coverageString = bin('dev-portal', 'react-scripts') + ' test --coverage'
  return augmentChildProcess(spawn(withCoverage ? coverageString : unitString, params), withCoverage)
}