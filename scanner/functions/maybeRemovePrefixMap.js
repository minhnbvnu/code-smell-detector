function maybeRemovePrefixMap(cm, arg) {
    if (typeof arg == "string" && (/^\d$/.test(arg) || arg == "Ctrl-U")) return;
    cm.removeKeyMap(prefixMap);
    cm.state.emacsPrefixMap = false;
    cm.off("keyHandled", maybeRemovePrefixMap);
    cm.off("inputRead", maybeRemovePrefixMap);
  }