function runZlib() {
  if (typeof Ya != "function") {
    InitializeZlibBenchmark();
  }
  Ya(["1"]);
}