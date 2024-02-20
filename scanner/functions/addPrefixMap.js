function addPrefixMap(cm) {
    cm.state.emacsPrefixMap = true;
    cm.addKeyMap(prefixMap);
    cm.on("keyHandled", maybeRemovePrefixMap);
    cm.on("inputRead", maybeRemovePrefixMap);
  }