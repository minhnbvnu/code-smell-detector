function rebuild() {
  logProgress(
    buildTestFile(process.cwd(), testFile, skpmConfig.test),
    'Looking for the test files'
  ).then(testFiles => {
    previousTestFiles = testFiles.sort((a, b) => a.name > b.name)
  })
}