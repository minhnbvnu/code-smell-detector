function processCoverage (coverage) {
  console.log('Lambdas:')
  console.log(`    Statements: ${formatCoverageItem(coverage.lambdas, 'statements')}`)
  console.log(`    Conditionals: ${formatCoverageItem(coverage.lambdas, 'conditionals')}`)
  console.log(`    Methods: ${formatCoverageItem(coverage.lambdas, 'methods')}`)
  console.log(`    Elements: ${formatCoverageItem(coverage.lambdas, 'elements')}`)

  console.log('Dev Portal:')
  console.log(`    Statements: ${formatCoverageItem(coverage.devPortal, 'statements')}`)
  console.log(`    Conditionals: ${formatCoverageItem(coverage.devPortal, 'conditionals')}`)
  console.log(`    Methods: ${formatCoverageItem(coverage.devPortal, 'methods')}`)
  console.log(`    Elements: ${formatCoverageItem(coverage.devPortal, 'elements')}`)

  console.log('Overall:')
  console.log(`    Statements: ${formatCoverageItem(coverage.overall, 'statements')}`)
  console.log(`    Conditionals: ${formatCoverageItem(coverage.overall, 'conditionals')}`)
  console.log(`    Methods: ${formatCoverageItem(coverage.overall, 'methods')}`)
  console.log(`    Elements: ${formatCoverageItem(coverage.overall, 'elements')}`)
}