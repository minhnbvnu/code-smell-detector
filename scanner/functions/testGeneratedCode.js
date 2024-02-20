function testGeneratedCode(t) {
  var base = fs.readFileSync('test-out/_base.js', 'utf8');
  var a = fs.readFileSync('test-out/sample-lib-a.js', 'utf8');
  var b = fs.readFileSync('test-out/sample-lib-b.js', 'utf8');

  var output = 'd export\n'
      + 'in c\n'
      + 'd export\n'
      + 'c export\n'
      + 'in a,\n'
      + 'json\n'
      + 'production\n'
      + 'c export\n'
      + 'in b\n';
  var withImport = 'imported sample/lib/a\n'
      + 'loaded a\n';
  var result = evalInScope(base, a, b);
  t.equal(result.console.str, output);
  t.equal(result.self, result.self.global);

  return Promise.resolve().then(function() {
    t.equal(result.console.str, output + withImport);

    // Order 2
    result = evalInScope(a, b, base);
    t.equal(result.console.str, output);
    return Promise.resolve().then(function() {
      t.equal(result.console.str, output + withImport);

      // Order 3
      result = evalInScope(a, base, b);
      t.equal(result.console.str, output);
      return Promise.resolve().then(function() {
        t.equal(result.console.str, output + withImport);
      });
    });
  });

  return Promise.resolve();
}