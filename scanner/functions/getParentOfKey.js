function getParentOfKey(key, withEndDot) {
  const lastDot = key.lastIndexOf('.');
  return lastDot === -1 ? '' : key.slice(0, lastDot + Number(!!withEndDot));
}