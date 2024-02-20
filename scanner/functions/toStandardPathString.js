function toStandardPathString(pathString) {
  const str = pathString.replace(/\//g, '#');
  if (str[0] === '#') {
    return str.slice(1);
  }
  return str;
}