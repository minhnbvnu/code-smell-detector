function invalidator() {
  let invalidate;
  const invalidation = new Promise((resolve) => (invalidate = resolve));
  return [invalidation, invalidate];
}