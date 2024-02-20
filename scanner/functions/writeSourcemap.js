function writeSourcemap(fileName, contents, log) {
  if (!fileName) {
    return Promise.resolve();
  }
  log('Writing sourcemap output to:', fileName);
  const writeMap = writeFile(fileName, contents, null);
  writeMap.then(() => log('Done writing sourcemap output'));
  return writeMap;
}