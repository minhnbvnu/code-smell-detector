function server(argv, callback) {
  argv.watch = true;
  webpackWrap(argv, function() {
    nico.server(argv, callback);
  });
}