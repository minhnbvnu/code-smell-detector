function canIUseAnimate() {
  const system = getSystemInfoSync();
  return compareVersion(system.SDKVersion, '2.9.0') >= 0;
}