function encodeParam (param) {
  return encodeURIComponent(param)
    .replace(/%5B/g, '[')
    .replace(/%7B/g, '{')
    .replace(/%5D/g, ']')
    .replace(/%7D/g, '}')
    .replace(/%25/g, '%')
    .replace(/'/g, '%27');
}