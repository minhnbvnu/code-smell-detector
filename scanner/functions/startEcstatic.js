function startEcstatic(args) {
  return spawn(node, [require.resolve('../lib/bin.js')].concat(args));
}