function inflateRaw(input, options) {
  options = options || {};
  options.raw = true;
  return inflate(input, options);
}