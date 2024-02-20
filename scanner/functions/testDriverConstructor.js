function testDriverConstructor(tap, Driver) {
  tap.test('driver mandatory options', function(t) {
    var baseDir = 'BASE';
    var server = {};
    var logger = {
      log: console.log,
    };
    t.equal(Driver.length, 1, 'constructor accepts 1 argument');
    t.doesNotThrow(function() {
      return new Driver({
        baseDir: baseDir,
        console: logger,
        server: server,
      });
    });
    t.throws(function() {
      return new Driver({
        console: logger,
        server: server,
      });
    });
    t.throws(function() {
      return new Driver({
        baseDir: baseDir,
        server: server,
      });
    });
    t.throws(function() {
      return new Driver({
        baseDir: baseDir,
        console: logger,
      });
    });
    t.end();
  });
}