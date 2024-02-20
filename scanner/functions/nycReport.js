function nycReport() {
  return spawn('./node_modules/.bin/nyc', ['report', '--colors'], {stdio: 'inherit'});
}