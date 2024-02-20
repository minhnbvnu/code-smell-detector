function stringMaskToRegExpMask(stringMask, maskReplacers = defaultMaskReplacers) {
  return maskToRegExpMask(stringMask.split(''), maskReplacers);
}