function sortAlpha(a, b) {
  // sort alphabetically in a deterministic way
  const shortLen = Math.min(a.length, b.length);
  for (let i = 0; i < shortLen; i++) {
    const aChar = a.charCodeAt(i);
    const bChar = b.charCodeAt(i);
    if (aChar !== bChar) {
      return aChar - bChar;
    }
  }
  return a.length - b.length;
}