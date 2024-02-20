function expr() {
    var n = mknode(EXPR, token, node)

    n.expecting = [].slice.call(arguments)
    return n
  }