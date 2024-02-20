function XUnit(runner, options) {
  Base.call(this, runner);
  var stats = this.stats
    , tests = []
    , self = this;

  if (options.reporterOptions && options.reporterOptions.output) {
      if (! fs.createWriteStream) {
          throw new Error('file output not supported in browser');
      }
      self.fileStream = fs.createWriteStream(options.reporterOptions.output);
  }

  runner.on('pending', function(test){
    tests.push(test);
  });

  runner.on('pass', function(test){
    tests.push(test);
  });

  runner.on('fail', function(test){
    tests.push(test);
  });

  runner.on('end', function(){
    self.write(tag('testsuite', {
        name: 'Mocha Tests'
      , tests: stats.tests
      , failures: stats.failures
      , errors: stats.failures
      , skipped: stats.tests - stats.failures - stats.passes
      , timestamp: (new Date).toUTCString()
      , time: (stats.duration / 1000) || 0
    }, false));

    tests.forEach(function(t) { self.test(t); });
    self.write('</testsuite>');
  });
}