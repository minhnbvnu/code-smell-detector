function linkifyDOI(string) {
  let str = string;
  if (!isValidUrl(str)) {
    str = `http://dx.doi.org/${str}`;
  }

  return linkify(str);
}