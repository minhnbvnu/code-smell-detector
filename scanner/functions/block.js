function block() {
  const endTime = performance.now() + interval;
  while (performance.now() < endTime) {}
}