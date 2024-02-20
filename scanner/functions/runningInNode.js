function runningInNode() {
  return (typeof module != 'undefined') && !!module.exports;
}