function getWindowsFirefoxDriverArchitectureOld(wantedArchitecture = '64') {
  const arch = wantedArchitecture.substr(-2) === '64' ? '64' : '32';

  return `win${arch}.zip`;
}