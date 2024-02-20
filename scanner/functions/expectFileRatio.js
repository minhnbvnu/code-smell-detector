function expectFileRatio({ file, maxRatio, minRatio, stdout, outputExt }) {
  expectStringContains(stdout, path.join(tempDir, file));

  const fileBasename = path.basename(file, path.extname(file));
  const outputFile = outputExt ? `${fileBasename}.${outputExt}` : file;

  const sizeBefore = fs.statSync(path.join(imagesDir, file)).size;
  const sizeAfter = fs.statSync(path.join(tempDir, outputFile)).size;

  const calculatedRatio = calcRatio(sizeBefore, sizeAfter);
  const stdoutRatio = grepTotalRatio(stdout);

  expect(stdoutRatio).toBe(calculatedRatio);
  expectRatio(stdoutRatio, minRatio, maxRatio);
}