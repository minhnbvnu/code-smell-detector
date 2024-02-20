function perfTestDefine(scope, done) {
  this.timeout(0);
  let benchSuite = new Benchmark.Suite();
  let currentTest = this.test;
  benchSuite.add("latest", scope.bind(this));
  Object.entries(icalPerf).forEach(([key, ical]) => {
    benchSuite.add(key, () => {
      let lastGlobal = crossGlobal.ICAL;
      crossGlobal.ICAL = ical;
      scope.call(this);
      crossGlobal.ICAL = lastGlobal;
    });
  });

  currentTest._benchCycle = [];

  benchSuite.on('cycle', function(event) {
    currentTest._benchCycle.push(String(event.target));
  });

  benchSuite.on('complete', function(event) {
    currentTest._benchFastest = this.filter('fastest').map('name');
    done(event.target.error);
  });

  benchSuite.run();
}