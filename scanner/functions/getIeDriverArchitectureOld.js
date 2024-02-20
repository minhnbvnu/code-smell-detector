function getIeDriverArchitectureOld(wanted) {
  let platform;

  if (wanted === 'ia32') {
    platform = 'Win32';
  } else {
    platform = 'x64';
  }

  return platform;
}