function arrayMaskToRegExpMask(arrayMask, maskReplacers = defaultMaskReplacers) {
  const flattenedMask = arrayMask
    .map((part) => {
      if (part instanceof RegExp) {
        return part;
      }
      if (typeof part === 'string') {
        return part.split('');
      }
      return null;
    })
    .filter(Boolean)
    .reduce((mask, part) => mask.concat(part), []);

  return maskToRegExpMask(flattenedMask, maskReplacers);
}