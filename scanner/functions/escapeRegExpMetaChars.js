function escapeRegExpMetaChars(str) {
  return str.replace(/[$.^()[\]{}]/g, '\\$&');
}