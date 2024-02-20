function definePolyfillCode(code,) {
  return [
    `(function(global) {`,
    code,
    `\n})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);`,
  ].join('');
}