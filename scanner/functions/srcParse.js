function srcParse (value) {
  warn('`src` property type is deprecated. Use `asset` instead.');
  return assetParse(value);
}