function BenchmarkSuite(name, reference, benchmarks) {
  this.name = name;
  this.reference = reference;
  this.benchmarks = benchmarks;
  BenchmarkSuite.suites.push(this);
}