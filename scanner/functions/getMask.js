function getMask(prefix, dialCode, predefinedMask, defaultMask, alwaysDefaultMask) {
  if (!predefinedMask || alwaysDefaultMask) {
    return prefix+''.padEnd(dialCode.length,'.')+' '+defaultMask;
  } else {
    return prefix+''.padEnd(dialCode.length,'.')+' '+predefinedMask;
  }
}