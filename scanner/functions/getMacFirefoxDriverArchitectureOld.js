function getMacFirefoxDriverArchitectureOld(extension) {
  return 'macos' + (process.arch === 'arm64' ? '-aarch64' : '') + extension;
}