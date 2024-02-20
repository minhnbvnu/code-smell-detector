function canIUseGroupSetData() {
  const system = getSystemInfoSync();
  return compareVersion(system.SDKVersion, '2.4.0') >= 0;
}