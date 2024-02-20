function maskToRegExpMask(mask, maskReplacers = defaultMaskReplacers) {
  return mask
    .map((char, index, array) => {
      const maskChar = maskReplacers[char] || char;
      const previousChar = array[index - 1];
      const previousMaskChar = maskReplacers[previousChar] || previousChar;
      if (maskChar === NEXT_CHAR_OPTIONAL) {
        return null;
      }
      if (previousMaskChar === NEXT_CHAR_OPTIONAL) {
        return makeRegexpOptional(castToRegexp(maskChar));
      }
      return maskChar;
    })
    .filter(Boolean);
}