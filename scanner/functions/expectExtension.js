function expectExtension (fileName, expected) {
  const actual = getFileExtension(fileName)
  expect(actual).to.eq(expected)
}