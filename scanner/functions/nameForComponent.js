function nameForComponent(component) {
    // remove "component:" prefix
    return component._debugContainerKey.slice(10);
  }