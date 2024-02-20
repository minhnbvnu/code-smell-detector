function getRelativeModulePath(modulePath) {
  return ensurePosix(path.relative(process.cwd(), modulePath));
}