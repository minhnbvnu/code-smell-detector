function singleQuoteString(str) {
  return `'${str.replace(/'/g, "\\'")}'`;
}