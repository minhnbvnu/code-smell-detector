function removeHiddenItems(group) {
    // only remove text frames, for performance
    // TODO: consider checking all item types
    // TODO: consider checking subgroups (recursively)
    // FIX: convert group.textFrames to array to avoid runtime error 'No such element' in forEach()
    forEach(toArray(group.textFrames), removeItemIfHidden);
  }