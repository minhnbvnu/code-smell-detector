function testImportViaScript(t) {
  var base = fs.readFileSync('test-out/_base.js', 'utf8');
  var a = fs.readFileSync('test-out/sample-lib-a.js', 'utf8');
  var b = fs.readFileSync('test-out/sample-lib-b.js', 'utf8');

  var result = evalInScope(
      base,
      'self.System.import("sample/lib/a").then(function(m) {console.log("A");m.test()});\n' +
      'self.System.import("sample/lib/b").then(function(m) {console.log("B1");m.test()});\n' +
      'self.System.import("sample/lib/b").then(function(m) {console.log("B2");m.test()});\n',
      b + a);

  t.equal(result.children.length, 2);
  result.children[0].onload();
  result.children[1].onload();

  var output = 'd export\n'
    + 'in c\n'
    + 'c export\n'
    + 'in b\n'
    + 'd export\n'
    + 'c export\n'
    + 'in a,\n'
    + 'json\n'
    + 'production\n'
    + 'A\n'
    + 'loaded a\n'
    + 'imported sample/lib/a\n'
    + 'loaded a\n'
    + 'B1\n'
    + 'loaded b\n'
    + 'B2\n'
    + 'loaded b\n'

  return Promise.resolve().then(function() {
    t.equal(result.console.str, output);
  });
}