function decl(flags) {
    var _ = mknode(DECL, token, node)
    _.flags = flags

    return _
  }