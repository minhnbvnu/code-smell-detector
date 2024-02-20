function cloneFixture(name, done) {
  var fixture = path.join(fixtures, name);
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir);
  }

  tmp.dir({dir: tmpDir}, function(error, dir) {
    if (error) {
      return done(error);
    }
    var scratch = path.join(dir, name);
    wrench.copyDirRecursive(fixture, scratch, function(error) {
      done(error, scratch);
    });
  });
}