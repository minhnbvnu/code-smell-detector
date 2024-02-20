function getArhType(platform) {
  switch (platform) {
    case 'linux':
      return 'linux64';
    case 'mac-arm64':
      return 'mac-arm64';
    case 'mac_arm':
      return 'mac-arm64';
    case 'mac':
      return 'mac-x64';
    case 'mac-x64':
      return 'mac-x64';
    case 'win32':
      return 'win32';
    case 'win64':
      return 'win64';
  }
}