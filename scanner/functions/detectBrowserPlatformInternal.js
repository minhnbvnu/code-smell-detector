function detectBrowserPlatformInternal(wantedArchitecture) {
  const platform = os.platform();
  switch (platform) {
    case 'darwin': {
      if (wantedArchitecture) {
        return wantedArchitecture === 'arm64' ? 'mac-arm64' : 'mac-x64';
      }
      return os.arch() === 'arm64' ? 'mac-arm64' : 'mac-x64';
    }
    case 'linux': {
      return 'linux';
    }
    case 'win32': {
      if (wantedArchitecture) {
        return wantedArchitecture === 'x64' || (wantedArchitecture === 'arm64' && isWindows11(os.release()))
          ? 'win32'
          : 'win64';
      }
      return os.arch() === 'x64' || (os.arch() === 'arm64' && isWindows11(os.release())) ? 'win32' : 'win64';
    }
    default:
      return undefined;
  }
}