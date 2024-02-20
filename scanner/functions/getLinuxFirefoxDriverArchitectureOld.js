function getLinuxFirefoxDriverArchitectureOld(extension, wantedArchitecture = 'x64') {
  const arch = wantedArchitecture === 'x64' ? '64' : '32';
  return 'linux' + arch + extension;
}