function maybeClearPrefix(cm, arg) {
    if (!cm.state.emacsPrefixMap && !prefixPreservingKeys.hasOwnProperty(arg))
      clearPrefix(cm);
  }