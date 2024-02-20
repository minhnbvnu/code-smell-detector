function deflateRaw(input, options) {
  options = options || {};
  options.raw = true;
  return deflate(input, options);
}