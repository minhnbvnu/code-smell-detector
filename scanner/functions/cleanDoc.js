function cleanDoc() {
  rimraf(DOC_PATH);
  log.info('removed', '_site folder');
}