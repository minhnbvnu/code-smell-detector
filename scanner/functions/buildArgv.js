function buildArgv(args) {
  let argv = ['/somewhere/node', '/somewhere/selenium-standalone'];

  if (args) {
    argv = argv.concat(args);
  }
  return argv;
}