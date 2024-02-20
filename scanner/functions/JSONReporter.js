function JSONReporter(runner) {
  var self = this;
  Base.call(this, runner);

  var tests = []
    , pending = []
    , failures = []
    , passes = [];

  runner.on('test end', function(test){
    tests.push(test);
  });

  runner.on('pass', function(test){
    passes.push(test);
  });

  runner.on('fail', function(test){
    failures.push(test);
  });

  runner.on('pending', function(test){
    pending.push(test);
  });

  runner.on('end', function(){
    var obj = {
      stats: self.stats,
      tests: tests.map(clean),
      pending: pending.map(clean),
      failures: failures.map(clean),
      passes: passes.map(clean)
    };

    runner.testResults = obj;

    process.stdout.write(JSON.stringify(obj, null, 2));
  });
}