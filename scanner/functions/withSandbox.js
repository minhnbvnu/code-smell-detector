function withSandbox(testFn) {
  var id = invocations++;
  var SANDBOX = path.resolve(__dirname, 'SANDBOX' + id);
  var emptyFile = path.resolve(SANDBOX, 'empty.json');
  var emptyJSON = JSON.stringify({});
  var blankFile = path.resolve(SANDBOX, 'blank.json');
  var blankJSON = '';
  var missingFile = path.resolve(SANDBOX, 'missing.json');
  rimraf(SANDBOX, function(e) {
    assert.ifError(e);
    mkdirp(SANDBOX, function(e) {
      assert.ifError(e);
      fs.writeFile(emptyFile, emptyJSON, 'utf8', function(e) {
        assert.ifError(e);
        fs.writeFile(blankFile, blankJSON, 'utf8', function(e) {
          assert.ifError(e);
          var sandbox = {
            root: SANDBOX,
            empty: emptyFile,
            blank: blankFile,
            missing: missingFile,
          };
          testFn(sandbox);
        });
      });
    });
  });
}