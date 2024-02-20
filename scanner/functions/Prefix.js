function Prefix(prefix, mask) {
  if (prefix instanceof Prefix)
    return prefix.clone();
  if (mask === undefined) {
    prefix = prefix || '';
    this.prefix = parseInt(prefix, 2) << (32 - prefix.length);
    this._length = prefix.length;
  } else {
    this.prefix = typeof prefix === 'string' ?
        parseIPv4(prefix) : prefix;
    this.length = typeof mask === 'string' ?
        getMaskLength(parseIPv4(mask)) : mask;
  }
}