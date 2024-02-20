function parseJSONPointer(value) {
  if (typeof value === 'string') {
    // Remove escape character
    if (value.indexOf('##/') === 0) {
      return value.slice(1);
    }

    let matches = value.match(/#\/([a-z]+)\/([0-9]+)/);
    if (matches) {
      const index = parseInt(matches[2], 10);
      return [matches[1], index];
    }

    // Legacy: `$$$i`
    matches = value.match(/\$\$\$([0-9]+)/);
    if (matches) {
      const index = parseInt(matches[1], 10);
      return ['accessors', index];
    }
  }

  return null;
}