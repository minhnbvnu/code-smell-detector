function addChainWatcher(obj, keyName, node) {
  if (!obj || ('object' !== typeof obj)) { return; } // nothing to do

  var m = metaFor(obj), nodes = m.chainWatchers;

  if (!m.hasOwnProperty('chainWatchers')) {
    nodes = m.chainWatchers = {};
  }

  if (!nodes[keyName]) { nodes[keyName] = []; }
  nodes[keyName].push(node);
  watchKey(obj, keyName);
}