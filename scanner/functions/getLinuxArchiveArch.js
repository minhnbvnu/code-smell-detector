function getLinuxArchiveArch() {
  switch (process.arch) {
    case 'ia32':
      return 'i386';
    case 'x64':
      return 'amd64';
    default:
      return process.arch;
  }
}