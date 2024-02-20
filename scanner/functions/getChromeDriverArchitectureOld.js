function getChromeDriverArchitectureOld(wantedArchitecture, version) {
  let platform;

  if (process.platform === 'linux') {
    platform = 'linux64';
  } else if (process.platform === 'darwin') {
    const arch = wantedArchitecture || process.arch;

    if (arch === 'arm64') {
      const [major] = version.split('.');
      platform = parseInt(major, 10) > 105 ? 'mac_arm64' : 'mac64_m1';
    } else {
      platform = 'mac64';
    }
  } else {
    platform = 'win32';
  }

  return platform;
}