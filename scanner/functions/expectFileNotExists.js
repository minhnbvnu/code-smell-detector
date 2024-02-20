function expectFileNotExists(fileName) {
  const isFileExists = fs.existsSync(path.join(tempDir, fileName));
  expect(isFileExists).not.toBe(true);
}