function mochaStats(runner) {
  const stats = {
    suites: 0,
    tests: 0,
    passes: 0,
    pending: 0,
    failures: 0
  };

  if (!runner) throw new Error("Missing runner argument");

  runner.stats = stats;

  runner.on("pass", () => stats.passes++);
  runner.on("fail", () => stats.failures++);
  runner.on("pending", () => stats.pending++);
  runner.on("test end", () => stats.tests++);

  runner.once("start", () => (stats.start = new Date()));

  runner.once("end", function() {
    stats.end = new Date();
    stats.duration = stats.end - stats.start;
  });
}