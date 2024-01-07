function getReporter() {
  if (!reporter) {
    const Reporter = require('./reporter');
    reporter = new Reporter();
  }
  return reporter;
}