function exitWithStatusCode(statusCode) {
  remote.app.emit('will-quit');
  remote.process.exit(statusCode);
}