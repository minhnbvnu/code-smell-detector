function getSystemParams() {
  // TODO support platform variant for linux
  return `${process.platform}-${process.arch}-${process.versions.modules || ''}`;
}