function getFirefoxDriverArchitectureOld(wantedArchitecture) {
  const extension = '.tar.gz';

  switch (process.platform) {
    case 'linux':
      return getLinuxFirefoxDriverArchitectureOld(extension, wantedArchitecture);
    case 'darwin':
      return getMacFirefoxDriverArchitectureOld(extension);
    case 'win32':
      return getWindowsFirefoxDriverArchitectureOld(wantedArchitecture);
    default:
      throw new Error('No Firefox driver is available for platform "' + process.platform + '"');
  }
}