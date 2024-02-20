function avaTest() {
  return spawn('./node_modules/.bin/nyc', ['--all', '--reporter=lcov', './node_modules/.bin/ava'], {stdio: 'inherit'});
}