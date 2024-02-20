function markDirtyUp(node) {
  node[isClean] = false;
  if (node.proxyOf.nodes) {
    var _iterator = _createForOfIteratorHelper(node.proxyOf.nodes),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var i = _step.value;
        markDirtyUp(i);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
}