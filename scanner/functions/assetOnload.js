function assetOnload(node, callback) {
    if (node.nodeName === 'SCRIPT') {
      scriptOnload(node, callback)
    } else {
      styleOnload(node, callback)
    }
  }