function parseAsArray(str) {
  str = trim(str).replace( /[\s,]+/g , ',' );
  return str.length === 0 ? [] : str.split(',');
}