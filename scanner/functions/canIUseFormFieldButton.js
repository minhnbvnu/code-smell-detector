function canIUseFormFieldButton() {
  const system = getSystemInfoSync();
  return compareVersion(system.SDKVersion, '2.10.3') >= 0;
}