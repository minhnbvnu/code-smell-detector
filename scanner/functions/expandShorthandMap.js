function expandShorthandMap(styles) {
  const expanded = {};
  for (const key in styles) {
    const longhands = shorthandToLonghand[key] || [key];
    for (let i = 0; i < longhands.length; i++) {
      expanded[longhands[i]] = key;
    }
  }
  return expanded;
}