function getArchiveName() {
  switch (process.platform) {
    case 'darwin':
      return 'atom-mac.zip';
    case 'win32':
      return `atom-${process.arch === 'x64' ? 'x64-' : ''}windows.zip`;
    default:
      return `atom-${getLinuxArchiveArch()}.tar.gz`;
  }
}