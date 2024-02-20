function expectFileExists(fileName) {
  const isFileExists = fs.existsSync(path.join(tempDir, fileName));
  expect(isFileExists).toBe(true);
}