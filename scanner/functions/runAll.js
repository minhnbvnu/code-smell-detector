async function runAll(sample) {
  const results = {};

  const testData = JSON.parse(
    fs.readFileSync(`${__dirname}/fixtures/benchmarks.json`).toString()
  );
  for (let benchmarkName in testData) {
    if (!program.raw && program.progress) {
      process.stdout.write(color(`\n${benchmarkName}: `, INDICATOR));
    }
    await runBenchmark(benchmarkName, sample, results);
  }
  return results;
}