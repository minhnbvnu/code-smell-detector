function log(...args) {
  if (level > levels.info) {
    return;
  }
  console.log(...args); // eslint-disable-line no-console
}