function assertFilesMatch(a, b) {
  b = b || a;
  var actual = fs.readFileSync(__dirname + '/../../test-app/js/' + a).toString();
  var expected = fs.readFileSync(__dirname + '/../support/build/' + b).toString();
  actual.should.equal(expected);
}