function getOneTimePassword(reporter) {
  return reporter.question(reporter.lang('npmOneTimePassword'));
}