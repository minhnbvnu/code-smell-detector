function _nodesArray(els) {
    return typeof els.length === "undefined" ? [].concat(els) : [].slice.call(els);
  }