function lineElt(node) {
    for (;;) {
      var parent = node.parentNode
      if (/CodeMirror-code/.test(parent.className)) return node
      node = parent
    }
  }