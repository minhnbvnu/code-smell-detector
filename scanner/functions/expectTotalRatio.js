function expectTotalRatio({ maxRatio, minRatio, stdout }) {
  const sizeBefore = calculateDirectorySize(imagesDir);
  const sizeAfter = calculateDirectorySize(tempDir);
  const calculatedRatio = calcRatio(sizeBefore, sizeAfter);
  const stdoutRatio = grepTotalRatio(stdout);

  expect(stdoutRatio).toBe(calculatedRatio);
  expectRatio(stdoutRatio, minRatio, maxRatio);
}