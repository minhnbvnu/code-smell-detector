function error(...args) {
  if (level > levels.error) {
    return;
  }
  console.error(...args); // eslint-disable-line no-console
}