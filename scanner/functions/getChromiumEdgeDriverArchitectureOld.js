function getChromiumEdgeDriverArchitectureOld(wantedArchitecture, version) {
  let platform;

  if (process.platform === 'linux') {
    platform = 'linux64';
  } else if (process.platform === 'darwin') {
    if (process.arch === 'arm64') {
      const [major] = version.split('.');
      platform = parseInt(major, 10) > 104 ? 'mac64_m1' : 'mac64';
    } else {
      platform = 'mac64';
    }
  } else if (wantedArchitecture === 'x32') {
    platform = 'win32';
  } else {
    platform = 'win64';
  }

  return platform;
}