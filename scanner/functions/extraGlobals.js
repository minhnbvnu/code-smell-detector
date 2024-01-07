function extraGlobals() {
  if (typeof process === 'object' && typeof process.version === 'string') {
    var parts = process.version.split('.');
    var nodeVersion = parts.reduce(function(a, v) {
      return (a << 8) | v;
    });

    // 'errno' was renamed to process._errno in v0.9.11.

    if (nodeVersion < 0x00090b) {
      return ['errno'];
    }
  }

  return [];
}