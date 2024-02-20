function GenerateKey() {
  // The benchmark framework guarantees that Math.random is
  // deterministic; see base.js.
  return Math.random();
}