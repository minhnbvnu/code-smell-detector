function checkForGypIfNeeded(config, cmd, paths) {
  if (cmd.substr(0, cmd.indexOf(' ')) !== 'node-gyp') {
    return Promise.resolve();
  }

  // Ensure this only runs once, rather than multiple times in parallel.
  if (!checkGypPromise) {
    checkGypPromise = _checkForGyp(config, paths);
  }
  return checkGypPromise;
}