function gzip(input, options) {
  options = options || {};
  options.gzip = true;
  return deflate(input, options);
}