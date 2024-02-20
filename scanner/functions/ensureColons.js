function ensureColons (str) {
  return (typeof str === 'string' && str[0] !== ':') ? wrapColons(str) : str;
}