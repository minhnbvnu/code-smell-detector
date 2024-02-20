function canIUseModel() {
  const system = getSystemInfoSync();
  return compareVersion(system.SDKVersion, '2.9.3') >= 0;
}