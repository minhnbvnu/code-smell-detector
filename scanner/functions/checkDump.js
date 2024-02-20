function checkDump(dump, expected) {
  expect(normalize(expected)).to.be.equal(normalize(dump));
}