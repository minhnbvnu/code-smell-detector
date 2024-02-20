function createIndent(n, indent) {
    return Array(Number(n) + 1).join(indent == 'spaces' ? ' ' : '\t')
  }