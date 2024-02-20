function expectFileNotModified(fileName) {
  const origImageBuffer = fs.readFileSync(path.join(imagesDir, fileName));
  const tempImageBuffer = fs.readFileSync(path.join(tempDir, fileName));

  expect(tempImageBuffer.equals(origImageBuffer)).toBe(true);
}