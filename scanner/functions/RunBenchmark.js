function RunBenchmark(name, count, run, warn) {
  for (var n = 0; n < count; ++n) {
    result = run();
    if (!warn(result)) {
      throw new Error("Earley or Boyer did incorrect number of rewrites");
    }
  }
}