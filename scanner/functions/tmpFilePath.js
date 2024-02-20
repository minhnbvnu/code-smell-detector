function tmpFilePath() {
  const tempDirPath = os.tmpdir()
  return path.resolve(tempDirPath, 'test.sol')
}